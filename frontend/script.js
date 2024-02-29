// Frontend script to fetch data from the server and store it in IndexedDB
const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

const openDBRequest = indexedDB.open("TestDB", 1);

openDBRequest.onerror = function(event) {
  console.error('Error opening database:', event.target.error);
};
openDBRequest.onupgradeneeded = function() {
  const db = openDBRequest.result;
  const objectStore = db.createObjectStore('jsonData', { 
    keyPath: 'id', 
    autoIncrement: true 
  });
  objectStore.createIndex('dataIndex', 'id');
};

openDBRequest.onsuccess = function() {
  const db = openDBRequest.result;

  // Function to fetch data from the server and store it in IndexedDB
  function fetchDataAndStore() {
    fetch('http://localhost:3000/data')
      .then(response => response.json())
      .then(jsonData => {
        const transaction = db.transaction(['jsonData'], 'readwrite');
        const objectStore = transaction.objectStore('jsonData');

        // Clear existing data in the object store
        objectStore.clear();

        // Store new data in IndexedDB
        jsonData.forEach(dataItem => {
          objectStore.add(dataItem);
        });

        transaction.oncomplete = function() {
          console.log('JSON data stored in IndexedDB:', jsonData);
        };

        transaction.onerror = function(event) {
          console.error('Error storing data:', event.target.error);
        };
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  // Initially fetch data and start the interval
  fetchDataAndStore();
  setInterval(fetchDataAndStore, 3000); // Fetch data every 5 seconds
};
