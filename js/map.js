let map;
let infoWindow;

function initMap() {
    const montevideo = { lat: -34.9011, lng: -56.1645 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: montevideo,
        zoom: 12
    });

    infoWindow = new google.maps.InfoWindow();

    // Cambia 'php/get_animales.php' si el nombre del archivo es diferente
    fetch('php/get_animales.php')
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                console.log('No data available.');
                return;
            }
            data.forEach(animal => {
                let icon;
                if (animal.tipo === 'perdido') {
                    icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                } else if (animal.tipo === 'encontrado') {
                    icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
                }

                const marker = new google.maps.Marker({
                    position: { lat: parseFloat(animal.latitud), lng: parseFloat(animal.longitud) },
                    map: map,
                    icon: icon
                });

                marker.addListener('click', () => {
                    const imageUrl = `uploads/${animal.foto}`;
                    const contentString = `
                        <div style="max-width: 300px;">
                            <h2>${animal.descripcion}</h2>
                            <p>${animal.descripcion}</p>
                            <p>Contacto: ${animal.telefono || 'No disponible'}</p>
                            <p><strong>Fecha de publicación:</strong> ${new Date(animal.fecha_publicacion).toLocaleString()}</p>
                            <img src="${imageUrl}" alt="Foto" style="max-width: 100%; height: auto;">
                        </div>
                    `;
                    infoWindow.setContent(contentString);
                    infoWindow.open(map, marker);
                });
            });
        })
        .catch(error => console.error('Error al cargar los datos:', error));
}

document.addEventListener("DOMContentLoaded", initMap);
