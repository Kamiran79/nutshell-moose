import ingredData from '../../helpers/data/ingredData';
import utils from '../../helpers/utils';
import './ingredients.scss';
import authData from '../../helpers/data/authData';

const typeToIcon = (type, size) => {
  let print = '';
  switch (type) {
    case 'vegetable':
      print = `<i class="fa fa-carrot ${size} ingred-types"></i>`;
      break;
    case 'fruit':
      print = `<i class="fa fa-apple-alt ${size} ingred-types"></i>`;
      break;
    case 'protein':
      print = `<i class="fa fa-drumstick-bite ${size} ingred-types"></i>`;
      break;
    default: print = '';
  }
  return print;
};

const ingredDom = (data) => {
  let domString = '<div class="d-flex justify-content-center flex-wrap" id="ingredients-list">';
  if (authData.checkAuth()) {
    domString += `
  <div class="card flip-container" id="add-menu-item">  
    <div class="card-body"> 
      <div class="flipper"> 
        <div class="front flip-add-menu-form">
          <div class="p-2 text-center"><i class="fas fa-plus fa-5x ingred-types"></i></div>
          <h5 class="card-title mb-auto p-2 text-center">Add Ingredient</h5>
        </div>
        <div class="back flex-column">
          <form id="add-new-ingredient">
              <div class="form-group">
                <input type="text" class="form-control" name="ingredName" placeholder="Ingedient Name">
                <label for="exampleFormControlSelect1">Ingredient Type</label>
                  <select class="form-control" name="ingredType" id="exampleFormControlSelect1">
                    <option value="vegetable">Vegetable</option>
                    <option value="fruit">Fruit</option>
                    <option value="protein">Protein</option>
                  </select>
                  <label for="ingredQuantity">Quantity</label>
                  <input type="text" class="form-control" name="ingredQuantity" placeholder="10">
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary">Add New Ingredient</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  </div>`;
  } // end if

  data.forEach((ingredient) => {
    domString += `
          <div class="card${authData.checkAuth() ? ' flip-container' : ''}" id="add-menu-item">
            <div class="card-body">
              <div class="flipper">
                <div class="front d-flex flex-column h-100 flip-add-menu-form">
                  <div class="p-2 text-center">${typeToIcon(ingredient.type, 'fa-4x')}</div>
                  <h5 class="card-title mb-auto p-2 text-center">${ingredient.name}</h5>
                  <h5 class="carcard-title mb-auto p-2 text-center">${ingredient.quantity} In Stock</h5>`;
    if (authData.checkAuth()) {
      domString += `
                  <div class="d-flex justify-content-center flex-nowrap m-4">
                    <span class="fa-stack fa-lg">
                      <i class="fa fa-circle fa-stack-2x"></i>
                      <i class="fa fa-pen fa-stack-1x fa-inverse"></i>
                    </span>
                    <span class="fa-stack fa-lg">
                      <i class="fa fa-circle fa-stack-2x"></i>
                      <i class="fa fa-trash fa-stack-1x fa-inverse delete-ingredient" data-delete-id="${ingredient.id}"></i>
                    </span>
                  </div>`;
    } // end if

    domString += `
                </div>
                <div class="back flex-column">
                  <form class="edit-ingredient">
                    <div class="form-group">
                      <input type="text" class="form-control" name="ingredName" value="${ingredient.name}">
                      <label for="exampleFormControlSelect1">Ingredient Type</label>
                      <select class="form-control" name="ingredType" id="exampleFormControlSelect1">
                        <option value="vegetable"${ingredient.type === 'vegetable' ? ' selected' : ''}>Vegetable</option>
                        <option value="fruit"${ingredient.type === 'fruit' ? ' selected' : ''}>Fruit</option>
                        <option value="protein"${ingredient.type === 'protein' ? ' selected' : ''}>Protein</option>
                      </select>
                      <label for="ingredQuantity">Quantity</label>
                      <input type="text" class="form-control" name="ingredQuantity" value="${ingredient.quantity}">
                    </div>
                    <div class="form-group">
                      <input type="hidden" name="ingredientId" value="${ingredient.id}">
                      <button type="submit" class="btn btn-primary">Edit Ingredient</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
            `;
  });
  domString += '</div>';
  return domString;
};

const ingredients = () => {
  ingredData.getIngredients()
    .then((printIngredients) => {
      utils.printToDom('#console', ingredDom(printIngredients));
    })
    .catch((err) => console.error(err));
};

export default { ingredDom, ingredients, typeToIcon };
