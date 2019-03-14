import { config } from './config';
import firebase from 'firebase';

export const firebaseApp = firebase.initializeApp(config);
export const firestore = firebaseApp.firestore();