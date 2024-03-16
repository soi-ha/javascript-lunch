import './style.css';
import ArrowIcon from '../../assets/svg/down-arrow.svg';
import { DROP_BOX_MAP } from '../../constants';
import { DropBoxName } from '../../types';

class DropBoxInnerHtmlMaker {
  #html?: string;

  constructor(name: DropBoxName) {
    this.#setHTML(name);
  }

  #getDropBoxProps(name: DropBoxName) {
    return DROP_BOX_MAP.get(name);
  }

  get html() {
    return this.#html;
  }

  #setHTML(name: DropBoxName) {
    const dropBoxProps = this.#getDropBoxProps(name);

    if (dropBoxProps) {
      const { selectProps, labelText, options } = dropBoxProps;

      const html = /*html*/ `
        <label class="screen-read-only" for="${selectProps.id}">
          ${labelText}
        </label >
        <img src=${ArrowIcon} class="arrow-icon"/>
        <select
          name="${selectProps.name}"
          id="${selectProps.id}"
          class="${selectProps.class}"
          ${selectProps.required ? 'required' : ''}
        >
        ${options
          .map(
            (option) =>
              `<option value="${option.value}" ${option.hidden ? 'hidden' : ''}>${option.text}</option>`,
          )
          .join('')}
        </select>
    `;

      this.#html = html;
    }
  }
}
export default DropBoxInnerHtmlMaker;
