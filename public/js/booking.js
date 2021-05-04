const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const price = document.getElementById('price');
var array=[];
const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
};

populateUI();
var book=0;
const updateSelectedSeatsCount = () => {
  const selectedSeats = document.querySelectorAll('.row .selected');
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  book=selectedSeatsCount;
  count.innerText = selectedSeatsCount;
  price.innerText = selectedSeatsCount * 250;
};

// Seat select event
container.addEventListener('click', e => {
    if(book==4)
    {
        alert("Maximum limit crossed");
    }
if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied') && book<4
  ) {
      console.log(book);
    e.target.classList.toggle('selected');

    updateSelectedSeatsCount();
  }


});



