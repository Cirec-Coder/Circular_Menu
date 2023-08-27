// Cette partie du code étend le prototype de l'objet Number pour ajouter une méthode "rotate".
Number.prototype.rotate = function (angle) {
    const degToRad = Math.PI / 180; // Conversion de degrés en radians
    return {
        x: Math.round(Math.cos(angle * degToRad) * this), // Calcul de la coordonnée x après rotation
        y: Math.round(Math.sin(angle * degToRad) * this)  // Calcul de la coordonnée y après rotation
    };
};

// Sélectionne un élément du DOM ayant la classe "main-btn" et le stocke dans la variable "btnMenu".
const btnMenu = document.querySelector('.main-btn');

// Sélectionne tous les éléments <a> ayant une classe qui commence par "btn-" et les stocke dans la variable "btns".
const btns = document.querySelectorAll("a[class*=btn-]");

// Ajoute des écouteurs d'événements aux boutons <a> sélectionnés.
btns.forEach(btn => {
    // Lorsque la souris entre dans la zone du bouton (<a>), cette fonction est exécutée.
    btn.addEventListener("mouseenter", () => {
        if (btn.classList.contains('active')) {
            // Si le bouton a la classe 'active', récupère les styles calculés de l'élément.
            const styles = getComputedStyle(btn);
            // Extrait les valeurs de transformation de la matrice à partir des styles calculés.
            const matrixValues = styles.transform.match(/matrix.*\((.+)\)/)[1].split(', ');
            // Applique une nouvelle transformation à l'élément avec une échelle augmentée sur l'axe X et Y.
            btn.style = `transform: matrix(1.7, ${matrixValues[1]}, ${matrixValues[2]}, 1.7, ${matrixValues[4]}, ${matrixValues[5]});`;
        }
    });

    // Lorsque la souris quitte la zone du bouton (<a>), cette fonction est exécutée.
    btn.addEventListener("mouseleave", () => {
        if (btn.classList.contains('active')) {
            // Si le bouton a la classe 'active', récupère les styles calculés de l'élément.
            const styles = getComputedStyle(btn);
            // Extrait les valeurs de transformation de la matrice à partir des styles calculés.
            const matrixValues = styles.transform.match(/matrix.*\((.+)\)/)[1].split(', ');
            // Rétablit la transformation précédente avec une échelle réduite sur l'axe X et Y.
            btn.style = `transform: matrix(1.5, ${matrixValues[1]}, ${matrixValues[2]}, 1.5, ${matrixValues[4]}, ${matrixValues[5]});`;
        }
    });
});

// Ajoute un écouteur d'événements au bouton de menu (btnMenu).
btnMenu.addEventListener('click', () => {
    let radius, scale, delay,
    steps = 360 / btns.length;

    // Parcourt tous les boutons <a>.
    btns.forEach((btn, idx) => {
        if (btn.classList.contains('visible')) {
            radius = 0;    // Si le bouton est déjà visible, réduit le rayon et l'échelle.
            scale = 0.5;
            delay = 0;     // Pas de délai de transition.
        } else {
            radius = 120;  // Si le bouton n'est pas visible, augmente le rayon et l'échelle.
            scale = 1.5;
            delay = 500;   // Délai de transition de 500 ms.
        }
        // Calcule les nouvelles coordonnées x et y après rotation pour placer le bouton.
        const values = radius.rotate(idx * steps + 30);
        // Applique les transformations (translation, mise à l'échelle et délai de transition) au bouton.
        btn.style = `transform: translateX(${values.x}px) translateY(${values.y}px) scale(${scale});
        transition-delay: ${25 * idx}ms;`;
        // Basculer la classe 'visible' pour afficher ou masquer le bouton.
        btn.classList.toggle('visible');
        // Après un certain délai, bascule la classe 'active' pour activer ou désactiver l'effet actif.
        setTimeout(() => {
            btn.classList.toggle('active');
        }, delay);
    });
    // Bascule la classe 'active' du bouton de menu pour activer ou désactiver l'effet actif du menu.
    btnMenu.classList.toggle('active');
});
