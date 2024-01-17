import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  collection,
  getDocs,
  getFirestore,
  addDoc,
  doc,
  // getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  // limit,
  serverTimestamp,
} from 'firebase/firestore';

import { IBoard } from '@features/boards/types';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const initializeAPI = (): FirebaseApp => {
  const firebaseApp = initializeApp({
    apiKey: 'AIzaSyDxOR_yoU0MHyo8EMt47uDrsTg567h01kw',
    authDomain: 'ykboard-822c2.firebaseapp.com',
    projectId: 'ykboard-822c2',
    storageBucket: 'ykboard-822c2.appspot.com',
    messagingSenderId: '1014965389747',
    appId: '1:1014965389747:web:228688e65fb98a7ca263c6',
  });
  getFirestore(firebaseApp); //инициализируем базу данных
  return firebaseApp;
};

export const getDesksApi = async (): Promise<IBoard[]> => {
  const db = getFirestore();
  const desks: IBoard[] = [];
  const ref = collection(db, 'desks');
  const q = query(ref, orderBy('createdAt'));
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<IBoard, 'id'>;
      const createdAtString = format(data.createdAt.toDate(), 'HH:mm dd MMMM yyyy', { locale: ru });
      let updatedAtString = null;
      if (data.updatedAt) {
        updatedAtString = format(data.updatedAt.toDate(), 'HH:mm dd MMMM yyyy', { locale: ru });
      }
      desks.push({ id: doc.id, ...data, updatedAt: updatedAtString, createdAt: createdAtString });
    });
  } catch (error) {
    return Promise.reject(error);
  }
  return desks;
};

export const deleteDeskApi = async (id: string): Promise<any> => {
  const db = getFirestore();
  try {
    await deleteDoc(doc(db, 'desks', id));
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createDeskApi = async (data: Omit<IBoard, 'id'>): Promise<any> => {
  const db = getFirestore();
  try {
    await addDoc(collection(db, 'desks'), { ...data, createdAt: serverTimestamp() });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateDeskApi = async (data: IBoard): Promise<any> => {
  const db = getFirestore();
  const id = data.id;

  try {
    await updateDoc(doc(db, 'desks', id), { ...data, updatedAt: serverTimestamp() });
  } catch (error) {
    return Promise.reject(error);
  }
};
