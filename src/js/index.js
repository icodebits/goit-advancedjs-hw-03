import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener('DOMContentLoaded', () => {
    const breedSelect = document.querySelector('.breed-select');
    const loader = document.querySelector('.loader');
    const catInfo = document.querySelector('.cat-info');

    function showLoader() {
        loader.style.display = "inline-block";
    }

    function hideLoader() {
      loader.style.display = "none";
    }

    function showError() {
        iziToast.error({ title: 'Error', message: 'Something went wrong, please try again.' });
    }

    function showBreeds(breeds) {
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
            breedSelect.appendChild(option);
        });
        breedSelect.hidden = false;
    }

    function showCatInfo(cat) {
        const img = document.createElement('img');
        img.src = cat.url;
        img.alt = cat.breeds[0].name;

        const name = document.createElement('h2');
        name.textContent = cat.breeds[0].name;

        const description = document.createElement('p');
        description.textContent = cat.breeds[0].description;

        const temperament = document.createElement('p');
        temperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;

        catInfo.innerHTML = '';
        catInfo.appendChild(img);
        catInfo.appendChild(name);
        catInfo.appendChild(description);
        catInfo.appendChild(temperament);
        catInfo.hidden = false;
    }

    breedSelect.addEventListener('change', () => {
        const breedId = breedSelect.value;
        //hideError();
        catInfo.hidden = true;
        showLoader();

        fetchCatByBreed(breedId)
            .then(cat => {
                showCatInfo(cat);
                hideLoader();
            })
            .catch(error => {
                showError();
                hideLoader();
            });
    });

    showLoader();
    fetchBreeds()
        .then(breeds => {
            showBreeds(breeds);
            hideLoader();

            new SlimSelect({
              select: '#selectElement'
            });
        })
        .catch(error => {
            showError();
            hideLoader();
        });
});
