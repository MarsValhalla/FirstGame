console.log("Starting");
let block = document.querySelector(".block");
let numbers = document.querySelectorAll("p");
let start_button = document.querySelector(".start");
let end_button = document.querySelector(".stop");
let timer = document.querySelector(".top_timet");
let intervalId; // Переменная для хранения идентификатора интервала
const list = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25,
];
let result = []; // Объявите как let для изменения

function shuffle(array) {
  console.log("shuffle:", array);
  for (let i = array.length - 1; i > 0; i--) {
    // Генерация случайного индекса от 0 до i
    const j = Math.floor(Math.random() * (i + 1));
    // Обмен значениями array[i] и array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return [...array];
  // return array
}

start_button.addEventListener("click", () => {
  start_process();
});

function starting() {
  console.log("Starting");

  clearInterval(intervalId); // Очищаем старый интервал

  let random_numbers = shuffle(list);
  console.log("Random numbers: " + random_numbers);

  numbers.forEach((cell) => {
    cell.textContent = random_numbers.shift(); // Присваиваем тексту ячейки случайное число из массива
    cell.style.display = "block"; // Убедитесь, что ячейки видимы
  });

  let time = 0.0;
  intervalId = setInterval(() => {
    time = time + 0.1;
    timer.textContent = time.toFixed(1);
  }, 100);
  start_button.addEventListener("click", () => {
    document.querySelector(".modal").style.display = "none";
    document.querySelector(".modal").style.zIndex = -1;
  });
}

numbers.forEach((p) => {
  p.addEventListener("click", () => {
    const value = parseInt(p.textContent);

    if (value === 1 || value === result[result.length - 1] + 1) {
      result.push(value);
      p.style.display = "none";

      if (result[result.length - 1] === 25) {
        stop_interval();
        start_button.textContent = "START";
        result = [];
        numbers.forEach((p) => {
          p.style.display = "block";
        });
        timer.textContent = "0.0";
      }
    }
  });
});

function stop_interval() {
  clearInterval(intervalId);
  // Останавливаем интервал по идентификатору
}

function start_process() {
  // Удаляем старый обработчик событий, если он есть
  end_button.removeEventListener("click", end_buttonClickHandler);
  end_button.addEventListener("click", end_buttonClickHandler);
  starting();
}

function end_buttonClickHandler() {
  stop_interval();
  start_button.textContent = "RESTART";

  document.querySelector(".modal").style.display = "block";
  document.querySelector(".modal").style.zIndex = 2;
}
function congratulations() {
  const canvas = document.getElementById("win");
  if (!canvas) {
    console.error("Canvas element not found!");
    return;
  }

  const jsConfetti = new JSConfetti({ canvas });

  jsConfetti.addConfetti({
    confettiColors: [
      "#ff0a54",
      "#ff477e",
      "#ff7096",
      "#ff85a1",
      "#fbb1bd",
      "#f9bec7",
    ],
  });

  console.log("Confetti animation triggered!");
}
