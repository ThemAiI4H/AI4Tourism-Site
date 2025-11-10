export const destinations = {
  roma: {
    name: 'Roma',
    region: 'Lazio',
    description: 'La Città Eterna, cuore pulsante dell\'Italia antica e moderna. Scopri i segreti di una metropoli che ha visto nascere l\'Impero Romano e che continua a essere il centro culturale del mondo.',
    longDescription: `Roma, la Città Eterna, è una delle città più antiche e affascinanti del mondo. Fondata secondo la leggenda nel 753 a.C., Roma è stata la capitale dell'Impero Romano più grande della storia.

    Oggi, Roma è una metropoli moderna che combina perfettamente il suo glorioso passato con la vita contemporanea. È la capitale d'Italia e una delle città più visitate al mondo, con milioni di turisti che ogni anno vengono ad ammirare le sue meraviglie.`,
    image: 'https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1529260830199-42e834d57831?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&h=600&fit=crop'
    ],
    highlights: [
      { name: 'Colosseo', description: 'L\'anfiteatro più grande mai costruito nell\'Impero Romano', icon: '🏛️' },
      { name: 'Vaticano', description: 'La Città del Vaticano con la Basilica di San Pietro', icon: '⛪' },
      { name: 'Fontana di Trevi', description: 'La fontana più famosa del mondo', icon: '⛲' },
      { name: 'Pantheon', description: 'Il tempio meglio conservato dell\'antichità', icon: '🏛️' }
    ],
    activities: [
      { name: 'Visita Guidata Colosseo', price: '€45', duration: '2h', rating: 4.8 },
      { name: 'Tour Vaticano e Musei', price: '€65', duration: '4h', rating: 4.9 },
      { name: 'Passeggiata Centro Storico', price: '€25', duration: '3h', rating: 4.6 },
      { name: 'Degustazione Cucina Romana', price: '€35', duration: '2h', rating: 4.7 }
    ],
    weather: { temp: 22, condition: 'Soleggiato', humidity: 45 },
    bestTime: 'Aprile - Giugno, Settembre - Ottobre',
    currency: 'EUR',
    language: 'Italiano',
    population: '2.8 milioni'
  },
  firenze: {
    name: 'Firenze',
    region: 'Toscana',
    description: 'Culla del Rinascimento italiano, Firenze è una città d\'arte che ospita alcuni dei più grandi capolavori dell\'umanità.',
    longDescription: `Firenze, il gioiello del Rinascimento, è considerata la culla dell'arte e dell'architettura rinascimentale. Questa città ha dato i natali a geni come Leonardo da Vinci, Michelangelo e Dante Alighieri.

    Il centro storico di Firenze è stato dichiarato Patrimonio dell'Umanità dall'UNESCO e offre una concentrazione unica di opere d'arte, palazzi storici e chiese magnifiche.`,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1520637836862-4d197d17c23a?w=800&h=600&fit=crop'
    ],
    highlights: [
      { name: 'Duomo di Firenze', description: 'La cattedrale gotica più grande d\'Italia', icon: '⛪' },
      { name: 'Uffizi Gallery', description: 'Uno dei musei più importanti del mondo', icon: '🎨' },
      { name: 'Ponte Vecchio', description: 'Il ponte medievale più famoso del mondo', icon: '🌉' },
      { name: 'Palazzo Vecchio', description: 'Il simbolo del potere civile di Firenze', icon: '🏰' }
    ],
    activities: [
      { name: 'Tour Uffizi e Accademia', price: '€55', duration: '3h', rating: 4.9 },
      { name: 'Visita Duomo e Battistero', price: '€35', duration: '2h', rating: 4.7 },
      { name: 'Degustazione Vini Toscani', price: '€45', duration: '2.5h', rating: 4.8 },
      { name: 'Passeggiata Oltrarno', price: '€20', duration: '2h', rating: 4.5 }
    ],
    weather: { temp: 20, condition: 'Parzialmente nuvoloso', humidity: 55 },
    bestTime: 'Maggio - Giugno, Settembre - Ottobre',
    currency: 'EUR',
    language: 'Italiano',
    population: '380.000'
  },
  venezia: {
    name: 'Venezia',
    region: 'Veneto',
    description: 'La Regina dell\'Adriatico, una città unica al mondo costruita sull\'acqua, con canali, ponti e palazzi gotici.',
    longDescription: `Venezia, la città dei canali, è una delle destinazioni più romantiche e uniche al mondo. Costruita su 118 isole nella laguna veneta, Venezia è collegata da 400 ponti e attraversata da 177 canali.

    Questa città millenaria è stata per secoli una potenza commerciale e artistica, e oggi continua a affascinare visitatori da tutto il mondo con la sua architettura gotica, i suoi canali e la sua atmosfera unica.`,
    image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=800&h=600&fit=crop'
    ],
    highlights: [
      { name: 'Piazza San Marco', description: 'Il salotto di Venezia, cuore della città', icon: '🏛️' },
      { name: 'Palazzo Ducale', description: 'Il simbolo del potere della Repubblica di Venezia', icon: '🏰' },
      { name: 'Canal Grande', description: 'La via d\'acqua più importante di Venezia', icon: '🚤' },
      { name: 'Basilica di San Marco', description: 'La cattedrale d\'oro di Venezia', icon: '⛪' }
    ],
    activities: [
      { name: 'Giro in Gondola', price: '€80', duration: '30min', rating: 4.6 },
      { name: 'Tour Palazzo Ducale', price: '€40', duration: '2h', rating: 4.8 },
      { name: 'Visita Basilica San Marco', price: '€30', duration: '1.5h', rating: 4.7 },
      { name: 'Escursione Isole Lagunari', price: '€65', duration: '4h', rating: 4.9 }
    ],
    weather: { temp: 18, condition: 'Nuvoloso', humidity: 70 },
    bestTime: 'Aprile - Giugno, Settembre - Novembre',
    currency: 'EUR',
    language: 'Italiano',
    population: '260.000'
  },
  napoli: {
    name: 'Napoli',
    region: 'Campania',
    description: 'Il calore del Mediterraneo, la pizza più famosa del mondo e una storia millenaria che affonda le radici nella Magna Grecia.',
    longDescription: `Napoli, la città partenopea, è una delle più antiche città d'Europa continuamente abitate. Fondata dai Greci nel VIII secolo a.C., Napoli ha una storia che abbraccia civiltà diverse: greca, romana, normanna, sveva, angioina e borbonica.

    Oggi Napoli è una città vibrante, piena di energia e calore mediterraneo. È famosa in tutto il mondo per la sua pizza, ma offre molto di più: dal suo centro storico UNESCO ai suoi musei, dalle sue chiese barocche ai suoi castelli.`,
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1520637836862-4d197d17c23a?w=800&h=600&fit=crop'
    ],
    highlights: [
      { name: 'Centro Storico', description: 'Patrimonio UNESCO, il cuore antico di Napoli', icon: '🏛️' },
      { name: 'Vesuvio', description: 'Il vulcano più famoso del mondo', icon: '🌋' },
      { name: 'Museo Archeologico', description: 'Il più importante museo di antichità al mondo', icon: '🏛️' },
      { name: 'Costiera Amalfitana', description: 'Una delle coste più belle del Mediterraneo', icon: '🏖️' }
    ],
    activities: [
      { name: 'Escursione Vesuvio', price: '€45', duration: '4h', rating: 4.7 },
      { name: 'Tour Centro Storico', price: '€25', duration: '2h', rating: 4.5 },
      { name: 'Degustazione Pizza Napoletana', price: '€15', duration: '1h', rating: 4.9 },
      { name: 'Visita Museo Archeologico', price: '€35', duration: '2.5h', rating: 4.6 }
    ],
    weather: { temp: 24, condition: 'Soleggiato', humidity: 60 },
    bestTime: 'Maggio - Giugno, Settembre - Ottobre',
    currency: 'EUR',
    language: 'Italiano',
    population: '970.000'
  },
  milano: {
    name: 'Milano',
    region: 'Lombardia',
    description: 'La capitale economica d\'Italia, centro della moda, del design e della finanza. Una città dinamica e cosmopolita.',
    longDescription: `Milano, la capitale economica d'Italia, è una città moderna e dinamica che combina tradizione e innovazione. È il centro della moda italiana, del design e della finanza, ma offre anche un patrimonio artistico e culturale di prim'ordine.

    Dalla maestosità del Duomo alla modernità del quartiere CityLife, Milano è una città che guarda al futuro senza dimenticare le sue radici storiche.`,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1520637836862-4d197d17c23a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
    ],
    highlights: [
      { name: 'Duomo di Milano', description: 'La cattedrale gotica più grande d\'Italia', icon: '⛪' },
      { name: 'Galleria Vittorio Emanuele', description: 'Il salotto di Milano, tempio dello shopping', icon: '🏪' },
      { name: 'Castello Sforzesco', description: 'Il castello simbolo della città', icon: '🏰' },
      { name: 'Navigli', description: 'Il quartiere dei canali, anima notturna di Milano', icon: '🌊' }
    ],
    activities: [
      { name: 'Visita Duomo e Terrazza', price: '€35', duration: '2h', rating: 4.8 },
      { name: 'Tour Fashion District', price: '€45', duration: '3h', rating: 4.6 },
      { name: 'Degustazione Cucina Milanese', price: '€40', duration: '2h', rating: 4.7 },
      { name: 'Visita Castello Sforzesco', price: '€20', duration: '1.5h', rating: 4.5 }
    ],
    weather: { temp: 19, condition: 'Pioggia leggera', humidity: 75 },
    bestTime: 'Aprile - Giugno, Settembre - Ottobre',
    currency: 'EUR',
    language: 'Italiano',
    population: '1.4 milioni'
  },
  pisa: {
    name: 'Pisa',
    region: 'Toscana',
    description: 'Famosa in tutto il mondo per la sua Torre Pendente, Pisa offre molto più di un\'inclinazione architettonica.',
    longDescription: `Pisa, la città della Torre Pendente, è una delle destinazioni più iconiche d'Italia. La sua Piazza dei Miracoli, con il Duomo, il Battistero e la Torre, è uno dei complessi monumentali più belli del mondo medievale.

    Ma Pisa non è solo la Torre: è una città universitaria vivace, con un centro storico affascinante, ottimi ristoranti e una vita culturale ricca.`,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1520637836862-4d197d17c23a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
    ],
    highlights: [
      { name: 'Torre di Pisa', description: 'Il monumento più famoso d\'Italia', icon: '🗼' },
      { name: 'Duomo di Pisa', description: 'La cattedrale romanica della Piazza dei Miracoli', icon: '⛪' },
      { name: 'Battistero', description: 'Il battistero più grande d\'Italia', icon: '🏛️' },
      { name: 'Camposanto Monumentale', description: 'Il cimitero monumentale più antico d\'Europa', icon: '⚱️' }
    ],
    activities: [
      { name: 'Visita Piazza dei Miracoli', price: '€25', duration: '2h', rating: 4.7 },
      { name: 'Tour Torre Pendente', price: '€40', duration: '1h', rating: 4.8 },
      { name: 'Escursione in Bicicletta', price: '€15', duration: '2h', rating: 4.4 },
      { name: 'Degustazione Vini Pisani', price: '€30', duration: '1.5h', rating: 4.6 }
    ],
    weather: { temp: 21, condition: 'Soleggiato', humidity: 50 },
    bestTime: 'Maggio - Giugno, Settembre - Ottobre',
    currency: 'EUR',
    language: 'Italiano',
    population: '90.000'
  }
};
