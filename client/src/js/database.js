import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


  
  export const getDb = async () =>{ 

  //creates a connection to the db and dictates which version to use
  const jateDb = await openDB('jate', 1);

  //generates a new transaction- tells you which db and what are the data privileges
  const tx = jateDb.transaction('jate', 'readonly');

  //opens the desired object store
  const store = tx.objectStore('jate');

  //uses the getAll method to get all data in the db
  const request = store.getAll();

  //gets confirmation of the request
    const result = await request;
    console.log('result.value', result);
  
    console.log('🚀 - data saved to the database', result);
    console.error('putDb not implemented');
    return result;
  };


  
  export const putDb = async (id, content) =>{ 
    
    //creates a connection to the db and dictates which version to use
    const jateDb = await openDB('jate', 1);
    
    //generates a new transaction- tells you which db and what are the data privileges
    const tx = jateDb.transaction('jate', 'readwrite');
    
    //opens the desired object store
    const store = tx.objectStore('jate');
    
    //uses the put method to update data in the db
    const request = store.put({ id: 1, jate: content });
    
    //gets confirmation of the request
    const result = await request;
    console.log('🚀 - data saved to the database', result);
    console.log('PUT to the database');
    console.error('getDb not implemented');
}
initdb();
