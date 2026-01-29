import noodle from '../assets/mainPage/noodle.svg'
import images from '../assets/mainPage/images.svg'
import fryedRice from '../assets/mainPage/fried-rice.svg'
import img10 from '../assets/mainPage/img10.svg'
import noodleWithOmlet from '../assets/mainPage/noodle-with-omlet.svg'

export const dishes = [
  { id: 1, name: 'Healthy noodle with spinach leaf', img: noodle, price: { S: 12, M: 15, L: 18 }, bowls: 22, categories: ["today", "special"] },
  { id: 2, name: 'Hot spicy fried rice with omelet', img: images, price: { S: 12, M: 15, L: 18 }, bowls: 13, categories: ['today', 'south'] },
  { id: 3, name: 'Spicy noodle with special omelette', img: fryedRice, price: { S: 12, M: 15, L: 18 }, bowls: 17, categories: ['today'] },
  { id: 4, name: 'Healthy noodle with spinach leaf', img: img10, price: { S: 22, M: 25, L: 28 }, bowls: 22, categories: ['today', 'special'] },
  { id: 5, name: 'Hot spicy fried rice with omelet', img: noodleWithOmlet, price: { S: 22, M: 25, L: 28 }, bowls: 13, categories: ['today', 'special'] },
  { id: 6, name: 'Spicy noodle with special omelette', img: noodle, price: { S: 22, M: 25, L: 28 }, bowls: 17, categories: ['special', 'today'] },
  { id: 7, name: 'Spicy seasoned seafood noodles', img: images, price: { S: 22, M: 25, L: 28 }, bowls: 20, categories: ['today', 'special'] },
  { id: 8, name: 'Salted pasta with mushroom sauce', img: fryedRice, price: { S: 22, M: 25, L: 28 }, bowls: 11, categories: ['today'] },
  { id: 9, name: 'Beef dumpling in hot and sour soup', img: img10, price: { S: 22, M: 25, L: 28 }, bowls: 16, categories: ['south', 'today'] },
];
