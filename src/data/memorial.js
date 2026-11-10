import { googlePhotos } from './googlePhotos';

export const memorial = {
  portrait: '/assets/Prof. Rajaguru.jpg',
  name: 'Prof. Rajaguru',
  dates: '08/10/1945 - 15/11/2025',
  heroTitle: 'In Loving Memory of',
  heroSubtitle: 'Our Treasure. Forever Loved.',

  homeIntro: [
    'Prof. Rajaguru was a gentle presence whose kindness made ordinary moments feel meaningful. His warmth, wisdom, laughter, and thoughtful spirit remain part of the lives he touched.',
    'This memorial is a place for family, friends, students, and community members to remember him, share stories, celebrate his life, and leave a message that can be revisited for years to come.',
  ],

  timeline: [
    {
      year: '1945',
      title: 'A New Beginning',
      text: 'Prof. Rajaguru was born in 1945, beginning a life that would become meaningful to family, friends, students, and everyone around him.',
    },
    {
      year: '1960s',
      title: 'Growing Through Education',
      text: 'His early years were shaped by education, curiosity, discipline, and a growing desire to learn and contribute to the people around him.',
    },
    {
      year: '1970s',
      title: 'Beginning His Professional Journey',
      text: 'He began building his professional life, developing a reputation for dedication, patience, and a thoughtful approach to his work.',
    },
    {
      year: '1980s',
      title: 'A Life of Teaching and Service',
      text: 'During this chapter of his life, he continued to guide and encourage others, leaving a lasting impression through his knowledge and personal example.',
    },
    {
      year: '1990s',
      title: 'Mentoring the Next Generation',
      text: 'His influence extended beyond his immediate work as he encouraged younger people to pursue learning, responsibility, and a life of purpose.',
    },
    {
      year: '2000s',
      title: 'Family, Friendship and Memories',
      text: 'These years were filled with family occasions, friendships, shared conversations, celebrations, and many memories that continue to be cherished.',
    },
    {
      year: '2010s',
      title: 'Wisdom Shared With Others',
      text: 'His later years reflected the wisdom and experiences gathered across a lifetime, with his kindness and guidance continuing to touch those around him.',
    },
    {
      year: '2025',
      title: 'A Life Remembered',
      text: 'Prof. Rajaguru passed away on 15 November 2025. The memories, lessons, kindness, and love he shared continue through everyone whose life he touched.',
    },
  ],

  photos: Array.isArray(googlePhotos) && googlePhotos.length > 0 ? googlePhotos : [
    {
      id: 'photo-1',
      src: '/assets/memorial-portrait.svg',
      alt: 'Prof. Rajaguru',
      caption: 'A cherished smile',
      title: 'Prof. Rajaguru',
    },
  ],
};
