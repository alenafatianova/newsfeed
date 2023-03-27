import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { IPartnersPosts } from './types';

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
};

export const getPartnersArticles = async (): Promise<IPartnersPosts[]> => {
  const db = getFirestore();
  const querySnapshot = await getDocs(collection(db, 'partners-posts'));
  const articles: IPartnersPosts[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data() as Omit<IPartnersPosts, 'id'>;
    articles.push({
      id: doc.id,
      ...data,
    });
  });

  return articles;
};
