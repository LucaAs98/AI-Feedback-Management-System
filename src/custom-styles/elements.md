# HTML Elements

## Buttons

- ### Primary button
  - #### HTML
    ```html
    <button type="button" class="cstm-btn btn-primary">
      <span class="material-symbols-outlined"> star </span>
      <span class="cstm-btn-text"> Primary Icon </span>
    </button>
    ```
  - #### Typescript
    ```ts
    <app-cstm-button [disabled]="isLoading" [text]="'Primary Button'" [type]="'primary'" [symbol]="star"
          (clicked)="clicked()"></app-cstm-button>
    ```

- ### Secondary button
  - #### HTML
    ```html
    <button type="button" class="cstm-btn btn-secondary">
      <span class="material-symbols-outlined"> star </span>
      <span class="cstm-btn-text">Secondary Button</span>
    </button>
    ```
  - #### Typescript
    ```ts
    <app-cstm-button [disabled]="isLoading" [text]="'Secondary Button'" [type]="'secondary'" [symbol]="star"
          (clicked)="clicked()"></app-cstm-button>
    ```

- ### Accent button
  - #### HTML
    ```html
    <button type="button" class="cstm-btn btn-accent">
      <span class="material-symbols-outlined"> star </span>
      <span class="cstm-btn-text">Accent Button</span>
    </button>
    ```
  - #### Typescript
    ```ts
    <app-cstm-button [disabled]="isLoading" [text]="'Accent Button'" [type]="'accent'" [symbol]="star"
          (clicked)="clicked()"></app-cstm-button>
    ```

## Input fields

- ### Input field
  - #### HTML
    ```html
    <div class="cstm-input-field-container">
      <label class="cstm-input-field-label">Label Input Field</label>
      <input type="text" class="cstm-input-field" placeholder="Input Field" [(ngModel)]="inputFieldVar">
    </div>
    ```
  - #### Typescript
    ```ts
      <app-cstm-input-field [label]="'Label'" [placeholder]="'Placeholder'" [(inputElement)]="inputElement">
      </app-cstm-input-field>
    ```

- ### Searchbar
```html
<div class="cstm-input-field cstm-searchbar-container">
  <input type="text" placeholder="Placeholder input field" class="cstm-input-searchbar"
    [(ngModel)]="searchInputVar">
  <button type="button" class="cstm-btn btn-searchbar">
    <span class="material-symbols-outlined"> search </span>
  </button>
</div>
```

## Dropdown
```html
<div class="dropdown">
  <button type="button" class="cstm-btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false">
    <span class="cstm-btn-text">Primary Dropdown</span>
    <span class="material-symbols-outlined dropdown-icon"></span>
  </button>

  <div class="dropdown-menu cstm-dropdown-menu">
    <button class="dropdown-item cstm-dropdown-item">Action</button>
    <button class="dropdown-item cstm-dropdown-item">Another action</button>
    <button class="dropdown-item cstm-dropdown-item">Something else here</button>
  </div>
</div>
```

## Modal

- ### Modal button
```html
<button type="button" class="cstm-btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Open Modal
</button>
```

- ### Modal
```html
<div class="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <span class="material-symbols-outlined fake-element"> arrow_back </span>
        <span class="modal-title">Modal title</span>
        <button type="button" class="cstm-modal-close-btn" data-bs-dismiss="modal" aria-label="Close"><span
            class="material-symbols-outlined">close</span></button>
      </div>
      <div class="modal-body">
        Modal Body
      </div>
      <div class="modal-footer">
        <button type="button" class="cstm-btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="cstm-btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```