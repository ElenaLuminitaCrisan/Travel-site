let navbar = document.querySelector('.header .navbar');
let mybutton = document.getElementById("myBtn");
let searchForm = document.querySelector('.search-form'); 
let searchData = [];

// Selectează toate link-urile din navbar
const navLinks = document.querySelectorAll('.header .navbar a');

// Funcție care adaugă clasa 'active' la link-ul curent
function activateLink() {
  navLinks.forEach(link => {
    // Verifică dacă href-ul link-ului corespunde cu pathname-ul curent
    if (link.href.includes(window.location.pathname) || window.location.pathname === '/' && link.href.includes('index.html')) {
      link.classList.add('active'); // Adaugă clasa 'active' la link-ul curent
    } else {
      link.classList.remove('active'); // Elimină clasa 'active' de la alte link-uri
    }
  });
}

// Apelarea funcției activateLink la încărcarea paginii
document.addEventListener('DOMContentLoaded', activateLink);

window.addEventListener('popstate', activateLink);

fetch('data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      return response.json();
    }
  })
  .then(data => {
    searchData = data;
    activateLink(); // Asigură-te că link-urile sunt activate după ce datele sunt încărcate
  })
  .catch(e => {
    console.error('Eroare la încărcarea datelor din data.json:', e);
  });


fetch('data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      return response.json();
    }
  })
  .then(data => {
    searchData = data;
  })
  .catch(e => {
    console.error('Eroare la încărcarea datelor din data.json:', e);
  });

document.querySelector('.search-form form').addEventListener('input', function(event) {
  event.preventDefault(); 
  const query = document.querySelector('.search-form input[type="search"]').value.trim();
  search(query); 
});

function search(query) {
  const results = searchData.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.description.toLowerCase().includes(query.toLowerCase())
  );
  if( query === ''){
      displayResults([])
  }else {
      displayResults(results);
  }

}

function displayResults(results) {
  const searchDisplay = document.querySelector('.search-display');
  searchDisplay.innerHTML = '';


  results.forEach(item => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('search-item');
    resultItem.innerHTML = `
      <h2>${item.title}</h2>
      <p>${item.description}</p>
      <a href="${item.url}">Citeste mai mult</a>
    `;
    searchDisplay.appendChild(resultItem);
  });
}

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.add('active');
};

document.querySelector('#nav-close').onclick = () =>{
    navbar.classList.remove('active');
};


document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.add('active');
};

document.querySelector('#close-search').onclick = () =>{
    searchForm.classList.remove('active');
};

// Funcție pentru deschiderea pop-up-ului de contact
function openPopup() {
    document.getElementById('contact-popup').style.display = 'flex';
}

// Funcție pentru închiderea pop-up-ului de contact
function closePopup() {
    document.getElementById('contact-popup').style.display = 'none';
}

// Funcție pentru resetarea formularului
function resetForm() {
    document.getElementById('contact-form').reset();
}

document.getElementById('close-search').addEventListener('click', closeFocusedSearch);

function closeFocusedSearch() {
    const searchDisplay = document.querySelector('.search-display');
    const searchBox = document.getElementById('search-box');
    if(searchDisplay){
        searchDisplay.innerHTML = '';
    }
    if(searchBox){
        searchBox.value = '';
    }
}

// Event listener pentru butonul de deschidere a pop-up-ului
document.getElementById('contact-btn').addEventListener('click', openPopup);

// Event listener pentru butonul de închidere a pop-up-ului
document.querySelector('.close-btn').addEventListener('click', () => {
    closePopup();
    resetForm(); // Resetează formularul la închiderea pop-up-ului
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(name.trim() === '') {
        alert('Te rog să introduci numele.');
    } else if(!emailRegex.test(email)) {
        alert('Te rog să introduci o adresă de email validă.');
    } else if(message.trim() === '') {
        alert('Te rog să introduci mesajul.');
    } else {
        alert('Formularul a fost trimis cu succes!');
        closePopup();
        resetForm();
    }
});


function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }

  if(window.scrollY > 0){
    document.querySelector('.header').classList.add('active');
  } else {
    document.querySelector('.header').classList.remove('active');
    navbar.classList.remove('active');
  }
}

window.onscroll = scrollFunction;

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

window.onload = () =>{
  if(window.scrollY > 0){
      document.querySelector('.header').classList.add('active');
  }else{
      document.querySelector('.header').classList.remove('active');
  }
};


var swiper = new Swiper(".home-slider", {
  loop: true,
  grabCursor: true,
  effect: 'fade',  // Efect de tranziție fade
  autoplay: {
      delay: 2000,
  },
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
  pagination: {
      el: ".swiper-pagination",
      clickable: true,
  },
});


var swiper = new Swiper(".product-slider", {
    loop:true, 
    grabCursor:true,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
    },
});

var swiper = new Swiper(".review-slider", {
    loop:true, 
    grabCursor:true,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
    },
});


var swiper = new Swiper(".blogs-slider", {
    loop:true, 
    grabCursor:true,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".clients-slider", {
    loop:true, 
    grabCursor:true,
    spaceBetween: 20,
    breakpoints: {
        0: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
    },
});
