const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const price = document.getElementById('price');
var selectedSeats= document.querySelectorAll('.row .selected');
  var seatsIndex= [...selectedSeats].map(seat => [...seats].indexOf(seat));
container.addEventListener('click', e => {
     
    if(seatsIndex.length>4)
    {
        alert("Maximum Booking limit crossed");
    }
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied') ) 
    {
      if(seatsIndex.length==4)
      {
        
        if(e.target.classList.contains('selected'))
        {
          e.target.classList.remove('selected');
          selectedSeats = document.querySelectorAll('.row .selected');
          seatsIndex= [...selectedSeats].map(seat => [...seats].indexOf(seat));
        }
        else
        {
          alert("Maximum Booking limit crossed");
        }
      }
      else
      {
        e.target.classList.toggle('selected');
        selectedSeats = document.querySelectorAll('.row .selected');
        seatsIndex= [...selectedSeats].map(seat => [...seats].indexOf(seat));
      }

      const selectedSeatsCount = selectedSeats.length;
      book=selectedSeatsCount;
      count.innerText = selectedSeatsCount;
      price.innerText = selectedSeatsCount * 250;
      
    }
});


function showBooking(){
  if(seatsIndex.length==0)
  {
    alert("Book atleast one seat!!");
    return false;
  }
  else
  {
    var seats=[];
    seatsIndex.map(function(item) { 
      seats.push(item+1); 
    });
    let seat=seats;
      fetch("http//:localhost/1600/success",
      {method:"post", 
        body:JSON.stringify(seats),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      });
  }
  
}


   

