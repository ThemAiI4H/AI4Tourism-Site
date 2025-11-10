'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { destinations } from '@/data/destinations';

interface ItineraryItem {
  id: string;
  type: 'activity' | 'destination' | 'day';
  title: string;
  description: string;
  duration?: string;
  price?: string;
  rating?: number;
  destination?: string;
  day?: number;
}

interface DayPlan {
  id: string;
  day: number;
  date: string;
  items: ItineraryItem[];
}

export default function ItineraryPlanner() {
  const [days, setDays] = useState<DayPlan[]>([
    {
      id: 'day-1',
      day: 1,
      date: '2024-06-15',
      items: []
    }
  ]);

  const [availableActivities, setAvailableActivities] = useState<ItineraryItem[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string>('roma');
  const [tripDuration, setTripDuration] = useState<number>(3);

  // Inizializza attività disponibili
  useEffect(() => {
    const activities: ItineraryItem[] = [];
    const destination = destinations[selectedDestination as keyof typeof destinations];

    if (destination) {
      destination.activities.forEach((activity, index) => {
        activities.push({
          id: `activity-${selectedDestination}-${index}`,
          type: 'activity',
          title: activity.name,
          description: `Attività a ${destination.name}`,
          duration: activity.duration,
          price: activity.price,
          rating: activity.rating,
          destination: destination.name
        });
      });
    }

    setAvailableActivities(activities);
  }, [selectedDestination]);

  // Aggiorna giorni del viaggio
  useEffect(() => {
    const newDays: DayPlan[] = [];
    for (let i = 1; i <= tripDuration; i++) {
      const existingDay = days.find(d => d.day === i);
      if (existingDay) {
        newDays.push(existingDay);
      } else {
        const baseDate = new Date('2024-06-15');
        baseDate.setDate(baseDate.getDate() + i - 1);

        newDays.push({
          id: `day-${i}`,
          day: i,
          date: baseDate.toISOString().split('T')[0],
          items: []
        });
      }
    }
    setDays(newDays);
  }, [tripDuration]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    // Se non c'è destinazione, ignora
    if (!destination) return;

    // Se è la stessa posizione, ignora
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    // Trova l'item trascinato
    let draggedItem: ItineraryItem | undefined;

    // Se viene dalla lista attività disponibili
    if (source.droppableId === 'available-activities') {
      draggedItem = availableActivities.find(item => item.id === draggableId);
    } else {
      // Se viene da un giorno esistente
      const sourceDay = days.find(day => day.id === source.droppableId);
      draggedItem = sourceDay?.items[source.index];
    }

    if (!draggedItem) return;

    // Crea una copia degli item
    const newDays = [...days];

    // Rimuovi dall'origine
    if (source.droppableId === 'available-activities') {
      // Non rimuovere dalla lista disponibile
    } else {
      const sourceDayIndex = newDays.findIndex(day => day.id === source.droppableId);
      if (sourceDayIndex !== -1) {
        newDays[sourceDayIndex].items.splice(source.index, 1);
      }
    }

    // Aggiungi alla destinazione
    if (destination.droppableId.startsWith('day-')) {
      const destDayIndex = newDays.findIndex(day => day.id === destination.droppableId);
      if (destDayIndex !== -1) {
        // Crea una copia dell'item con il giorno assegnato
        const newItem = { ...draggedItem, day: newDays[destDayIndex].day };
        newDays[destDayIndex].items.splice(destination.index, 0, newItem);
      }
    }

    setDays(newDays);
  };

  const removeItem = (dayId: string, itemIndex: number) => {
    const newDays = [...days];
    const dayIndex = newDays.findIndex(day => day.id === dayId);
    if (dayIndex !== -1) {
      newDays[dayIndex].items.splice(itemIndex, 1);
      setDays(newDays);
    }
  };

  const addDay = () => {
    setTripDuration(prev => prev + 1);
  };

  const removeDay = (dayId: string) => {
    if (days.length > 1) {
      setDays(days.filter(day => day.id !== dayId));
      setTripDuration(prev => prev - 1);
    }
  };

  const exportItinerary = () => {
    const itineraryData = {
      destination: destinations[selectedDestination as keyof typeof destinations]?.name,
      duration: tripDuration,
      days: days.map(day => ({
        day: day.day,
        date: day.date,
        activities: day.items.map(item => ({
          title: item.title,
          duration: item.duration,
          price: item.price
        }))
      }))
    };

    const dataStr = JSON.stringify(itineraryData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `itinerario-${selectedDestination}-${tripDuration}giorni.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Pianifica il tuo Itinerario</h2>
            <p className="text-blue-100 mt-1">Trascina e rilascia attività per creare il viaggio perfetto</p>
          </div>
          <button
            onClick={exportItinerary}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Esporta Itinerario
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col lg:flex-row">
          {/* Available Activities Sidebar */}
          <div className="lg:w-80 border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Attività Disponibili</h3>

              {/* Destination Selector */}
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(destinations).map(([slug, dest]) => (
                  <option key={slug} value={slug}>{dest.name}</option>
                ))}
              </select>

              {/* Trip Duration */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Durata viaggio:</label>
                <select
                  value={tripDuration}
                  onChange={(e) => setTripDuration(parseInt(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'giorno' : 'giorni'}</option>
                  ))}
                </select>
              </div>
            </div>

            <Droppable droppableId="available-activities">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-4 space-y-3 min-h-[400px] ${snapshot.isDraggingOver ? 'bg-blue-50' : ''}`}
                >
                  {availableActivities.map((activity, index) => (
                    <Draggable key={activity.id} draggableId={activity.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-3 bg-white border border-gray-200 rounded-lg shadow-sm cursor-move hover:shadow-md transition-shadow ${
                            snapshot.isDragging ? 'shadow-lg rotate-3' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 text-sm">{activity.title}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs text-gray-600">⏱️ {activity.duration}</span>
                                <span className="text-xs font-semibold text-blue-600">{activity.price}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 ml-2">
                              <span className="text-yellow-400 text-xs">⭐</span>
                              <span className="text-xs text-gray-600">{activity.rating}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* Itinerary Days */}
          <div className="flex-1 p-6">
            <div className="space-y-6">
              {days.map((day) => (
                <div key={day.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Giorno {day.day}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {new Date(day.date).toLocaleDateString('it-IT', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    {days.length > 1 && (
                      <button
                        onClick={() => removeDay(day.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Rimuovi giorno
                      </button>
                    )}
                  </div>

                  <Droppable droppableId={day.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-[120px] p-4 ${snapshot.isDraggingOver ? 'bg-blue-50' : 'bg-white'}`}
                      >
                        {day.items.length === 0 ? (
                          <div className="text-center text-gray-400 py-8">
                            <div className="text-4xl mb-2">📅</div>
                            <p className="text-sm">Trascina qui le attività per questo giorno</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {day.items.map((item, index) => (
                              <Draggable key={`${item.id}-${day.id}`} draggableId={`${item.id}-${day.id}`} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className={`flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm ${
                                      snapshot.isDragging ? 'shadow-lg' : ''
                                    }`}
                                  >
                                    <div className="flex items-center space-x-3">
                                      <div {...provided.dragHandleProps} className="cursor-move text-gray-400">
                                        ⋮⋮
                                      </div>
                                      <div>
                                        <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                                          <span>⏱️ {item.duration}</span>
                                          <span>{item.price}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => removeItem(day.id, index)}
                                      className="text-red-500 hover:text-red-700 text-sm"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          </div>
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}

              {/* Add Day Button */}
              <div className="text-center">
                <button
                  onClick={addDay}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  + Aggiungi Giorno
                </button>
              </div>
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
