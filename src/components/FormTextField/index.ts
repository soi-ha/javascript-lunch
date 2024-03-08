import { RestaurantInfoKey, RestaurantInfo } from '../../types';
import { Restaurant } from '../../domains';
import { RESTAURANT_INFO_FOR_VALIDATE_TEST } from '../../data/restaurantData';

class FormTextField extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    const labelText = this.getAttribute('labelText');
    const labelForId = this.getAttribute('labelForId');
    const key = this.getAttribute('key') as RestaurantInfoKey;

    const label = document.createElement('label');
    if (labelForId) label.setAttribute('for', labelForId);
    label.textContent = labelText;

    const slot = document.createElement('slot'); // Slot 요소 생성
    slot.setAttribute('name', 'formChild'); // Slot의 이름 설정

    const errorMessageBox = document.createElement('error-message-box');

    shadow.innerHTML = `
      <style>
        error-message-box{
          color: var(--lunch-primary-color);
          font-weight: 500;
          font-size: 12px;
        }
        label {
          margin-bottom: 6px;
          color: var(--lunch-grey-scale-4-color);
          font-size: var(--label-font-size);
          line-height: 20px;
        }
      </style>
    `;

    shadow.appendChild(label);
    shadow.appendChild(slot);
    shadow.appendChild(errorMessageBox);

    this.#addEventToChange(key);
  }

  #addEventToChange(key: RestaurantInfoKey) {
    const slotContent = this.shadowRoot
      ?.querySelector('slot')
      ?.assignedNodes()[0];
    if (slotContent) {
      slotContent.addEventListener('change', (event) =>
        this.#handleChangeToValidateValue(event, key),
      );
    }
  }

  #handleChangeToValidateValue(event: Event, key: RestaurantInfoKey) {
    const { value } = event.target as HTMLInputElement | HTMLTextAreaElement;
    const newInfo: RestaurantInfo = { ...RESTAURANT_INFO_FOR_VALIDATE_TEST };

    (newInfo[key] as string) = value;

    try {
      new Restaurant(newInfo);
      this.#handleErrorMessage('');
    } catch (error) {
      if (error instanceof Error) this.#handleErrorMessage(error.message);
    }
  }

  #handleErrorMessage(message?: string) {
    const errorMessageBoxEl =
      this.shadowRoot?.querySelector('error-message-box');

    if (errorMessageBoxEl?.textContent) {
      errorMessageBoxEl.textContent = message || null;
    }
  }
}
customElements.define('form-text-filed', FormTextField);
