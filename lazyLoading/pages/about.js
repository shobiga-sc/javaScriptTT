export default function () {
    const container = document.createElement('div');

    const heading = document.createElement('h1');
    heading.textContent = 'About';

    const paragraph1 = document.createElement('p');
    paragraph1.textContent = 'Welcome to the About page!';

    const paragraph2 = document.createElement('p');
    paragraph2.textContent = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius quo ut rem deleniti aliquam libero laudantium nihil at sint, nisi placeat soluta distinctio sunt aspernatur aut ea, quod ab commodi.`;

    container.appendChild(heading);
    container.appendChild(paragraph1);
    container.appendChild(paragraph2);

    return container.outerHTML;
}
