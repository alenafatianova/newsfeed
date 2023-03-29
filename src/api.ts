import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { IPartnersPosts } from './types';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const initializeAPI = (): any => {
  initializeApp({
    apiKey: 'AIzaSyAhdrWNb4e1VCUwJ3XjPlj09AafZlX8Sk8',
    authDomain: 'karpov-news-1b158.firebaseapp.com',
    projectId: 'karpov-news-1b158',
    storageBucket: 'karpov-news-1b158.appspot.com',
    messagingSenderId: '699348355839',
    appId: '1:699348355839:web:b0e784f8797467c587daca',
    measurementId: 'G-JZX6PCGZL4',
  });

  getFirestore();
  getStorage();
};

const partnersPostCollection = 'partners-posts';

export const getPartnersArticles = async (): Promise<IPartnersPosts[]> => {
  const db = getFirestore();
  const articles: IPartnersPosts[] = [];

  try {
    const querySnapshot = await getDocs(collection(db, partnersPostCollection));
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<IPartnersPosts, 'id'>;
      articles.push({
        id: doc.id,
        ...data,
      });
    });
  } catch (err) {
    return Promise.reject(err);
  }

  return articles;
};

export const createPartnerArticle = async (data: Omit<IPartnersPosts, 'id'>): Promise<void> => {
  const db = getFirestore();

  try {
    await addDoc(collection(db, partnersPostCollection), data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getPartnerArticle = async (id: string): Promise<IPartnersPosts> => {
  const db = getFirestore();
  const docRef = doc(db, 'partners-posts', id);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as Omit<IPartnersPosts, 'id'>;
      return {
        id: docSnap.id,
        ...data,
      };
    } else {
      throw new Error('Такой статьи нет!');
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updatePartnerArticle = async (id: string, data: Omit<IPartnersPosts, 'id'>): Promise<any> => {
  const db = getFirestore();
  const updatedArticle = doc(db, partnersPostCollection, id);

  try {
    await updateDoc(updatedArticle, data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deletePartnerArticle = async (id: string): Promise<any> => {
  const db = getFirestore();
  const ref = doc(db, partnersPostCollection, id);
  try {
    await deleteDoc(ref);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const uploadFile = async (file: File): Promise<string> => {
  const storage = getStorage();
  const storageRef = ref(storage, `${file.name} - ${Date.now()}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const url = getDownloadURL(snapshot.ref);

    return url;
  } catch (err) {
    return Promise.reject(err);
  }
};
