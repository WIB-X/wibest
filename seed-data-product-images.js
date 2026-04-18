/* WIB Product Images — name → official image URL */
var PRODUCT_IMAGES = {
  // ===== PHONES =====

  // Apple iPhones
  "iPhone 16": "https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_SX466_.jpg",
  "iPhone 16 Plus": "https://m.media-amazon.com/images/I/61fLnpKwBYL._AC_SX466_.jpg",
  "iPhone 16 Pro": "https://m.media-amazon.com/images/I/61iyamQpT3L._AC_SX466_.jpg",
  "iPhone 16 Pro Max": "https://m.media-amazon.com/images/I/81NK0gKVKjL._AC_SX466_.jpg",
  "iPhone 15": "https://m.media-amazon.com/images/I/71d7rfSl0wL._AC_SX466_.jpg",
  "iPhone 15 Pro Max": "https://m.media-amazon.com/images/I/81Os1SDWpcL._AC_SX466_.jpg",
  "iPhone 14": "https://m.media-amazon.com/images/I/61cwywLZR-L._AC_SX466_.jpg",
  "iPhone SE": "https://m.media-amazon.com/images/I/71RyJL+G3OL._AC_SX466_.jpg",

  // Samsung Galaxy
  "Samsung Galaxy S25": "https://m.media-amazon.com/images/I/71RKt5QmaJL._AC_SX466_.jpg",
  "Samsung Galaxy S25 Ultra": "https://m.media-amazon.com/images/I/71WcijowzNL._AC_SX466_.jpg",
  "Samsung Galaxy S25+": "https://m.media-amazon.com/images/I/71fnGmzy2lL._AC_SX466_.jpg",
  "Samsung Galaxy S24": "https://m.media-amazon.com/images/I/71YBOh3Z2sL._AC_SX466_.jpg",
  "Samsung Galaxy A55": "https://m.media-amazon.com/images/I/71h7TCFzfBL._AC_SX466_.jpg",
  "Samsung Galaxy M55": "https://m.media-amazon.com/images/I/71QECwTm3UL._AC_SX466_.jpg",
  "Samsung Galaxy M15": "https://m.media-amazon.com/images/I/81bH0FE7+RL._AC_SX466_.jpg",
  "Samsung Galaxy F55": "https://m.media-amazon.com/images/I/71YgYIRRyIL._AC_SX466_.jpg",
  "Samsung Galaxy Z Flip 6": "https://m.media-amazon.com/images/I/61sGzBs5MsL._AC_SX466_.jpg",
  "Samsung Galaxy Z Fold 6": "https://m.media-amazon.com/images/I/61BGE6iNsTL._AC_SX466_.jpg",

  // OnePlus
  "OnePlus 13": "https://m.media-amazon.com/images/I/61ZJI7-1f8L._AC_SX466_.jpg",
  "OnePlus 13R": "https://m.media-amazon.com/images/I/71Yk1l-uwiL._AC_SX466_.jpg",
  "OnePlus 12": "https://m.media-amazon.com/images/I/61ds5Dn0YqL._AC_SX466_.jpg",
  "OnePlus Nord 4": "https://m.media-amazon.com/images/I/61yeFUTVCkL._AC_SX466_.jpg",
  "OnePlus Nord CE 4": "https://m.media-amazon.com/images/I/61PpHVu59GL._AC_SX466_.jpg",

  // Xiaomi / Redmi / Poco
  "Xiaomi 14 Ultra": "https://m.media-amazon.com/images/I/61y0HxR7MeL._AC_SX466_.jpg",
  "Redmi Note 14": "https://m.media-amazon.com/images/I/81FMyZQ6XmL._AC_SX466_.jpg",
  "Redmi Note 14 Pro": "https://m.media-amazon.com/images/I/81vPVZwM0HL._AC_SX466_.jpg",
  "Redmi 13C": "https://m.media-amazon.com/images/I/81fF7nGZBkL._AC_SX466_.jpg",
  "Redmi K70 Ultra": "https://m.media-amazon.com/images/I/61Z4ic2YzBL._AC_SX466_.jpg",
  "Poco F6": "https://m.media-amazon.com/images/I/71BPAtYf4aL._AC_SX466_.jpg",
  "Poco X7 Pro": "https://m.media-amazon.com/images/I/71pUmGy6vRL._AC_SX466_.jpg",
  "Poco X7": "https://m.media-amazon.com/images/I/71Hd8b9ojRL._AC_SX466_.jpg",

  // iQOO
  "iQOO 13": "https://m.media-amazon.com/images/I/71PBkiv5XGL._AC_SX466_.jpg",
  "iQOO Neo 10R": "https://m.media-amazon.com/images/I/71eGqKfhXIL._AC_SX466_.jpg",
  "iQOO Neo 9 Pro": "https://m.media-amazon.com/images/I/71BAGwVcQXL._AC_SX466_.jpg",
  "iQOO Z9": "https://m.media-amazon.com/images/I/71RVgQTrIQL._AC_SX466_.jpg",

  // Realme
  "Realme GT 7": "https://m.media-amazon.com/images/I/71kS7v0a0EL._AC_SX466_.jpg",
  "Realme P3 Pro": "https://m.media-amazon.com/images/I/71f9d5zdNML._AC_SX466_.jpg",
  "Realme Narzo 70 Pro": "https://m.media-amazon.com/images/I/71ofM9SjpyL._AC_SX466_.jpg",
  "Realme P1": "https://m.media-amazon.com/images/I/71XfL3VnUjL._AC_SX466_.jpg",

  // Vivo
  "Vivo X200 Pro": "https://m.media-amazon.com/images/I/71yW2HCT-mL._AC_SX466_.jpg",
  "Vivo V40": "https://m.media-amazon.com/images/I/71vOJ3R5KsL._AC_SX466_.jpg",
  "Vivo V40e": "https://m.media-amazon.com/images/I/71OYlYjvnFL._AC_SX466_.jpg",
  "Vivo Y200": "https://m.media-amazon.com/images/I/71-fwJI5luL._AC_SX466_.jpg",

  // Oppo
  "Oppo Reno 13 Pro": "https://m.media-amazon.com/images/I/71V4Cl9nC7L._AC_SX466_.jpg",
  "Oppo Find X8 Pro": "https://m.media-amazon.com/images/I/71l-WkTqSqL._AC_SX466_.jpg",
  "Oppo Reno 12": "https://m.media-amazon.com/images/I/71JI5zfJfNL._AC_SX466_.jpg",

  // Nothing
  "Nothing Phone 2": "https://m.media-amazon.com/images/I/61KJklFwL+L._AC_SX466_.jpg",
  "Nothing Phone 3a": "https://m.media-amazon.com/images/I/61dKZHyeznL._AC_SX466_.jpg",
  "Nothing Phone 2a Plus": "https://m.media-amazon.com/images/I/61EqbWA-xhL._AC_SX466_.jpg",
  "Nothing CMF Phone 1": "https://m.media-amazon.com/images/I/61yX8GfeqcL._AC_SX466_.jpg",

  // Google
  "Google Pixel 9 Pro": "https://m.media-amazon.com/images/I/71KCGz7ZqkL._AC_SX466_.jpg",
  "Google Pixel 8a": "https://m.media-amazon.com/images/I/71n1LSv1l7L._AC_SX466_.jpg",

  // Motorola
  "Motorola Edge 50 Pro": "https://m.media-amazon.com/images/I/71B8lxdLLqL._AC_SX466_.jpg",

  // ===== LAPTOPS =====

  // Apple MacBooks
  "MacBook Air M3 13": "https://m.media-amazon.com/images/I/71Y5o4nBTIL._AC_SX466_.jpg",
  "MacBook Air M3 15": "https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SX466_.jpg",
  "MacBook Pro 14 M4": "https://m.media-amazon.com/images/I/61RJ6maxOQL._AC_SX466_.jpg",
  "MacBook Pro 16 M4": "https://m.media-amazon.com/images/I/61M-N28F9dL._AC_SX466_.jpg",

  // Dell
  "Dell XPS 13": "https://m.media-amazon.com/images/I/71G4jmsGNNL._AC_SX466_.jpg",
  "Dell XPS 14": "https://m.media-amazon.com/images/I/71hfbqUVRNL._AC_SX466_.jpg",
  "Dell XPS 15": "https://m.media-amazon.com/images/I/71xoR4A6q-L._AC_SX466_.jpg",
  "Dell Inspiron 14": "https://m.media-amazon.com/images/I/71kKAdh3EHL._AC_SX466_.jpg",
  "Dell Inspiron 15": "https://m.media-amazon.com/images/I/81+CzqQJlKL._AC_SX466_.jpg",
  "Dell G15": "https://m.media-amazon.com/images/I/71V4d-9nfRL._AC_SX466_.jpg",

  // HP
  "HP Spectre x360": "https://m.media-amazon.com/images/I/71PiZkpv8tL._AC_SX466_.jpg",
  "HP Pavilion 14": "https://m.media-amazon.com/images/I/71O2BeJ4qIL._AC_SX466_.jpg",
  "HP Pavilion Plus": "https://m.media-amazon.com/images/I/71YJaAOlLNL._AC_SX466_.jpg",
  "HP 15s": "https://m.media-amazon.com/images/I/71yOCQp4F1L._AC_SX466_.jpg",
  "HP Victus": "https://m.media-amazon.com/images/I/71h+0yzgJ4L._AC_SX466_.jpg",

  // Lenovo
  "Lenovo ThinkPad X1 Carbon": "https://m.media-amazon.com/images/I/71RPIRpGOAL._AC_SX466_.jpg",
  "Lenovo IdeaPad Slim 3": "https://m.media-amazon.com/images/I/71zSjhZVCAL._AC_SX466_.jpg",
  "Lenovo Legion 5": "https://m.media-amazon.com/images/I/71m5K-Wb5bL._AC_SX466_.jpg",
  "Lenovo Yoga Slim 7": "https://m.media-amazon.com/images/I/71qid7QNtGL._AC_SX466_.jpg",

  // ASUS
  "ASUS Vivobook 15": "https://m.media-amazon.com/images/I/71jG6IbNhBL._AC_SX466_.jpg",
  "ASUS ROG Strix G15": "https://m.media-amazon.com/images/I/81fF6tDkjPL._AC_SX466_.jpg",
  "ASUS Zenbook 14": "https://m.media-amazon.com/images/I/71nNBcTxjlL._AC_SX466_.jpg",
  "ASUS TUF Gaming A15": "https://m.media-amazon.com/images/I/81b9oNcqAPL._AC_SX466_.jpg",

  // Acer
  "Acer Aspire 3": "https://m.media-amazon.com/images/I/71QwzqoaUUL._AC_SX466_.jpg",
  "Acer Aspire 7": "https://m.media-amazon.com/images/I/71YQX0YAkhL._AC_SX466_.jpg",
  "Acer Predator Helios": "https://m.media-amazon.com/images/I/81LJ-HM0KaL._AC_SX466_.jpg",

  // MSI
  "MSI Cypher GF65": "https://m.media-amazon.com/images/I/81OaNtY1F0L._AC_SX466_.jpg",
  "MSI Modern 14": "https://m.media-amazon.com/images/I/71nOvE6dMyL._AC_SX466_.jpg",

  // Microsoft Surface
  "Microsoft Surface Pro 11": "https://m.media-amazon.com/images/I/61n+wCpY-cL._AC_SX466_.jpg",
  "Microsoft Surface Laptop 7": "https://m.media-amazon.com/images/I/71w3oJ7aWBL._AC_SX466_.jpg",
  "Surface Laptop Studio 2": "https://m.media-amazon.com/images/I/71vQYqIOVkL._AC_SX466_.jpg"
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = PRODUCT_IMAGES;
}
