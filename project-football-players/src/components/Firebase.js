// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { useEffect, useState, useContext } from 'react';
import styles from './Firebase.module.css';
import Context from '../store/context';
const Firebase = () => {
  const ctx = useContext(Context);
  console.log(ctx);
  //const [adres, setAdres] = useState('');
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // const [player, setPlayer] = useState('');
  // ctx.playerName her değiştiğinde buradaki state olan player güncellenecek
  // useEffect(() => {
  //   if (ctx._currentValue.playerName !== 'aaa bbb') {
  //     const [first, last] = ctx._currentValue.playerName.split(' ');
  //     const playerLowerName = last.toLowerCase();
  //     setPlayer(playerLowerName);
  //     console.log(playerLowerName);
  //   }
  // }, [ctx]);

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // useEffect(() => {
  //   if (player !== '') {
  //     const firebaseConfig = {
  //       apiKey: 'AIzaSyBaLfePni-5tvGS-O-l7yQ4YyjXVcJvUAg',
  //       authDomain: 'soccerplayers-27cac.firebaseapp.com',
  //       databaseURL: 'https://soccerplayers-27cac-default-rtdb.firebaseio.com',
  //       projectId: 'soccerplayers-27cac',
  //       storageBucket: 'soccerplayers-27cac.appspot.com',
  //       messagingSenderId: '113566113905',
  //       appId: '1:113566113905:web:4a88e578b3a6b358fe3bd0',
  //       measurementId: 'G-H602KR48NB',
  //     };

  //     // Initialize Firebase
  //     const app = initializeApp(firebaseConfig);

  //     // Initialize Cloud Storage and get a reference to the service
  //     const storage = getStorage(app);

  //     // Create a storage reference from our storage service
  //     const foto = ref(storage, `${player}.jpg`);

  //     getDownloadURL(foto).then((url) => {
  //       // Insert url into an <img> tag to "download"
  //       setAdres(url);
  //     });
  //   }

  //   // Child references can also take paths delimited by '/'
  //   //const spaceRef = ref(storage, 'images/space.jpg');}
  // }, [player]);
  //<img className={styles.img} src={adres} alt="blabla"></img>
  return <div></div>;
};

export default Firebase;
