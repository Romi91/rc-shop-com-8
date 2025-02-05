const view = (shop => {
    const _modalContainer = document.getElementById('modalContainer');
    const _spinnerContainer = document.getElementById('spinnerContainer');
    const createElement = (elementType, id, className, events, placeholder, content, htmlFor, src ) => {
        const element = document.createElement(elementType);
        // element.innerText = content;
        if (events && events.length) {
            for (let i = 0; i < events.length; i++) {
                const event = events[i];
                element[event.type] = event.method;
            }
        }
        if (placeholder) {
            element.placeholder = placeholder;
        }
        if (id) {
            element.id = id;
        }
        if (className) {
            element.className = className;
        }
        if (elementType === 'input') {
            element.placeholder = placeholder ;
            element.id = id;
        } 
        if (htmlFor) {
            element.htmlFor = htmlFor;
        } else if (elementType === 'label') {
            element.For = id;
        }
        if (elementType === 'img') {
            element.src = src;
        }
        if (elementType === 'p' || elementType === 'h1' || elementType === 'h2' || elementType === 'h3' ||
            elementType === 'h4' || elementType === 'h5' || elementType === 'h6' || elementType === 'a' || elementType === 'button') {
            element.innerHTML = content;
        }
        return element;
    }
    // This function create a modal window with Bootstrap Classes
    const createModal = () => {
        const _modalRow = createElement('div', '', 'row', false);
        const _modalCol = createElement('div', '', 'col-md-12', false);
        const _openBtn = createElement('button', 'openBtn', 'btn btn-primary', false, false, 'Open Modal');
        const _modalBox = createElement('div', 'modalBox', 'modal fade');
        const _modalDialog = createElement('div', '', 'modal-dialog modal-dialog-centered modal-lg');
        const _modalContent = createElement('div', '', 'modal-content');
        const _modalHeader = createElement('div', 'modalHeader', 'modal-header');
        const _modalBody = createElement('div', 'modalBody', 'modal-body');
        const _modalFooter = createElement('div', 'modalBody', 'modal-footer');
        const _modalIcon = createElement('i', 'modalIcon', '');
        const _modalMessage = createElement('h3', 'modalMessage', 'text-justify, font-weight-bold', );
        const closeModal = createElement('button', 'modalBtn', 'btn btn-danger close', false, false, 'Continue');
        _openBtn.setAttribute('data-toggle', 'modal')
        _openBtn.setAttribute('data-target', '#modalBox')
        closeModal.type = 'button';
        closeModal.setAttribute('data-dismiss', 'modal');
        if (_modalContainer) {
            _modalContainer.appendChild(_modalRow);
        }
        _modalRow.appendChild(_modalCol);
        _modalCol.appendChild(_openBtn);
        _modalCol.appendChild(_modalBox);
        _modalBox.appendChild(_modalDialog);
        _modalDialog.appendChild(_modalContent);
        _modalContent.appendChild(_modalHeader);
        _modalContent.appendChild(_modalBody);
        _modalContent.appendChild(_modalFooter);
        _modalHeader.appendChild(_modalIcon);
        _modalBody.appendChild(_modalMessage);
        _modalFooter.appendChild(closeModal);
        return _modalRow;
    }
    //This function modified content inside the modal
    const showModal = status => {
        const modal = createModal();
        const _icon = document.getElementById('modalIcon');
        const _modalMessage = document.getElementById('modalMessage');
        const _modalBtn = document.getElementById('modalBtn');
        if (status) {
            _icon.classList.add('fas', 'fa-check-circle');
            if (_modalMessage) {
                _modalMessage.classList.add('text-success');
                _modalMessage.innerHTML = 'Su compra ha sido un éxito';
            }
            _modalBtn.textContent = 'Continue';
        } else {
            if (_modalMessage) {
                _modalMessage.classList.add('fas', 'fa-exclamation-triangle');
                _modalMessage.classList.add('text-danger');
                _modalMessage.innerHTML = 'Ocurrió un error, intente de nuevo.';
            }
            _modalBtn.textContent = 'Intente de Nuevo';
        }
        return modal;
    }
    const createSpinner = () => {
        const _spinner = createElement('div', 'spinner', 'spinner-border text-primary d-none');
        if (_spinnerContainer) {
            _spinnerContainer.appendChild(_spinner);
        }
        return _spinner
    }
    // Promise to simulate buying process
    const openModal = () => {
        return new Promise((resolve, reject) => {
            const num = (new Date()).toLocaleTimeString().substr(-1);
            console.log(num)
            if (num > 5) {
                resolve();
            } else {
                reject(error);
            }
        })
    }
    const showSpinner = () => {
        const _spinner = document.getElementById('spinner');
        _spinner.classList.remove('d-none');
    }
    const validate = () => {
        setTimeout(showSpinner(), 1500);
    }
    const createItem = () => {
        const divContainer = createElement('div', false, 'carousel-item');
        const img = createElement('img', false, 'd-block w-100', false, false, 'https://fravega.vteximg.com.br/arquivos/ids/6191779-1000-1000/celular-liberado-samsung-galaxy-s10e-azul-781304.jpg');
        divContainer.appendChild(img);
        const divSubContainer = createElement('div',false,'carousel-caption d-none d-md-block');
        divContainer.appendChild(divSubContainer);
        const label1  = createElement('h5',false, 'h5', false, false, 'First slide label');
        divContainer.appendChild(label1);
        const paragraph = createElement('p',false, 'p', false, false, 'Nulla vitae elit libero, a pharetra augue mollis interdum.');
        divContainer.appendChild(paragraph);
        return divContainer;
    }
    const buildCarouselItems = () => {
        const renderArea = document.getElementById('productdetail');
        if (renderArea) {
            const item = createItem();
            renderArea.appendChild(item);
        }
    }
    const createProductsRow = products => {
        const el = document.getElementById('cards-list');
        const row = createElement('section', false, 'row');
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            const detail = 'This is a description';
            const card = createCard(product.model, detail, product.price, product.images, product.id);
            row.appendChild(card);
        }
        el.appendChild(row);
    }

    const createCard = (cardTitle, body, price, images, id) => {
        let cardImg = './images/default-img.jpg';
        if (images.length) {
            cardImg = `products/${images[0]}`;
        }
        const cardDeck = createElement('div', '', 'col-6 card-deck', false, false, false, false);
        const card  = createElement('div', '', 'card', false, false, false, false);
        const img   = createElement('img', '', 'card-img-top img-fluid',false, false, false, false, cardImg);
        const cardB = createElement('div', '', 'card-body', false, false, false, false);
        const a = createElement('a', '', '', false, false, cardTitle, false);
        const title = createElement('h5', '', 'card-title', false, false, '');
        a.href = `./detail.html#${id}`;
        title.appendChild(a);
        const text  = createElement('p','','card-text', false, false, body, false);
        const textS = createElement('p', '', 'text-muted', false, false, ` $${price.toFixed(2)} `, false);
        card.appendChild(img);
        card.appendChild(cardB);
        cardB.appendChild(title);
        cardB.appendChild(text);
        cardB.appendChild(textS);
        cardDeck.appendChild(card);
        //const cardId =  document.getElementById('cardId');
        //cardId.appendChild(cardDeck);
        return cardDeck
    }
    // This function create a modal window with Bootstrap Classes
    const createModal = () => {
        const _modalRow = createElement('div', '', 'row', false);
        const _modalCol = createElement('div', '', 'col-md-12', false);
        const _openBtn = createElement('button', 'openBtn', 'btn btn-primary', false, false, 'Open Modal')
        const _modalBox = createElement('div', 'modalBox', 'modal fade');
        const _modalDialog = createElement('div', '', 'modal-dialog modal-dialog-centered modal-lg');
        const _modalContent = createElement('div', '', 'modal-content');
        const _modalHeader = createElement('div', 'modalHeader', 'modal-header');
        const _modalBody = createElement('div', 'modalBody', 'modal-body');
        const _modalFooter = createElement('div', 'modalBody', 'modal-footer');
        const _modalIcon = createElement('i', 'modalIcon', '');
        const _modalMessage = createElement('h3', 'modalMessage', 'text-justify, font-weight-bold', );
        const closeModal = createElement('button', 'modalBtn', 'btn btn-danger', false, false, 'Continue');
        closeModal.type = 'button';
        closeModal.setAttribute('data-dismiss', 'modal');
        _modalContainer.appendChild(_modalRow);
        _modalRow.appendChild(_modalCol);
        _modalCol.appendChild(_modalBox);
        _modalRow.appendChild(_openBtn);
        _modalBox.appendChild(_modalDialog);
        _modalDialog.appendChild(_modalContent);
        _modalContent.appendChild(_modalHeader);
        _modalContent.appendChild(_modalBody);
        _modalContent.appendChild(_modalFooter);
        _modalHeader.appendChild(_modalIcon);
        _modalBody.appendChild(_modalMessage);
        _modalFooter.appendChild(closeModal);
        return _modalRow;
    }
    //This function modified content inside the modal
    const showModal = (success, error) => {
        const modal = createModal();
        const _icon = document.getElementById('modalIcon');
        const _modalMessage = document.getElementById('modalMessage');
        const _modalBtn = document.getElementById('modalBtn');
        if (success) {
            _icon.classList.add('fas', 'fa-check-circle');
            _modalMessage.classList.add('text-success');
            _modalMessage.textContent = 'Su compra ha sido un éxito';
            _modalBtn.textContent = 'Continue';
        } 
        if (error) {
            _modalMessage.classList.add('fas', 'fa-exclamation-triangle');
            _modalMessage.classList.add('text-warning');
            _modalMessage.textContent = 'Ocurrió un error, intente de nuevo.';
            _modalBtn.textContent = 'Intente de Nuevo';
        }
        return modal;
    }
    // Promise to simulate buying process
    const openModal = new Promise((resolve, reject) => {
        let num = Math.random();
        if (num > 0.5) {
            resolve();
        } else {
            reject(error);
        }
    })
    openModal
        .then(()=> {
            showModal(success);
        })
        .catch((error)=> {
            showModal(error);
        })
    return {
        createModal,
        createElement,
        showModal,
        openModal,
        buildCarouselItems,
        createSpinner,
        createProductsRow
    }
})(shop);

view.showModal();
view.testMethod();
