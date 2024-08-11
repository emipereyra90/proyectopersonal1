let mapPerdido, mapEncontrado;
let markerPerdido, markerEncontrado;

function showForm(type) {
    document.getElementById('perdido-form').style.display = 'none';
    document.getElementById('encontrado-form').style.display = 'none';
    if (type === 'perdido') {
        document.getElementById('perdido-form').style.display = 'block';
        initMap('perdido');
    } else if (type === 'encontrado') {
        document.getElementById('encontrado-form').style.display = 'block';
        initMap('encontrado');
    }
}

function initMap(type) {
    const montevideo = { lat: -34.9011, lng: -56.1645 }; // Coordenadas de Montevideo, Uruguay

    if (type === 'perdido') {
        if (!mapPerdido) {
            mapPerdido = new google.maps.Map(document.getElementById('map-perdido'), {
                center: montevideo,
                zoom: 12
            });
            google.maps.event.addListener(mapPerdido, 'click', function(event) {
                placeMarker(event.latLng, type);
            });
        }
    } else if (type === 'encontrado') {
        if (!mapEncontrado) {
            mapEncontrado = new google.maps.Map(document.getElementById('map-encontrado'), {
                center: montevideo,
                zoom: 12
            });
            google.maps.event.addListener(mapEncontrado, 'click', function(event) {
                placeMarker(event.latLng, type);
            });
        }
    }
}

function placeMarker(location, type) {
    if (type === 'perdido') {
        if (markerPerdido) {
            markerPerdido.setMap(null); // Eliminar marcador existente
        }
        markerPerdido = new google.maps.Marker({
            position: location,
            map: mapPerdido,
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        });
        document.getElementById('latitud-perdido').value = location.lat();
        document.getElementById('longitud-perdido').value = location.lng();
    } else if (type === 'encontrado') {
        if (markerEncontrado) {
            markerEncontrado.setMap(null); // Eliminar marcador existente
        }
        markerEncontrado = new google.maps.Marker({
            position: location,
            map: mapEncontrado,
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        });
        document.getElementById('latitud-encontrado').value = location.lat();
        document.getElementById('longitud-encontrado').value = location.lng();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    initMap('perdido'); // Inicializa el mapa con la opción 'perdido' por defecto
});

// Manejar la respuesta del formulario
document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar la recarga de la página

        const formData = new FormData(this);

        fetch(this.action, {
            method: this.method,
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            if (result.includes("Registro guardado correctamente")) {
                document.getElementById('success-message').style.display = 'block';
                this.reset(); // Limpiar el formulario
                setTimeout(() => {
                    document.getElementById('success-message').style.display = 'none';
                }, 3000);
            } else {
                alert("Error al publicar: " + result);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error al publicar.");
        });
    });
});
