import { plainToClass } from 'class-transformer';
import { ShoppingCartUpdateDto } from './shopping-cart-update.dto';
import { ShoppingCartAction } from './shopping-cart.action';
import { Validator } from 'class-validator';

describe('ShoppingCartUpdateDto', () => {
  let validator: Validator;
  beforeEach(() => {
    validator = new Validator();
  });

  describe('object creation', () => {

    it('should create object successfully', async () => {
      const errors = await validator.validate(plainToClass(ShoppingCartUpdateDto, {
        action: ShoppingCartAction.ADD,
        productId: 'product-id',
        quantity: 1,
      }));

      expect(errors.length).toBe(0);
    });

    it('should return ValidationError (quantity must not be less than 1)', async () => {
      const errors = await validator.validate(plainToClass(ShoppingCartUpdateDto, {
        action: ShoppingCartAction.ADD,
        productId: 'product-id',
        quantity: 0,
      }));

      expect(errors).toContainEqual({
        target: {
          action: ShoppingCartAction.ADD,
          productId: 'product-id',
          quantity: 0,
        },
        value: 0,
        property: 'quantity',
        children: [],
        constraints: { min: 'quantity must not be less than 1' },
      });
    });

    it('should return ValidationError (quantity must be an integer number)', async () => {
      const errors = await validator.validate(plainToClass(ShoppingCartUpdateDto, {
        action: ShoppingCartAction.ADD,
        productId: 'product-id',
        quantity: 2.5,
      }));

      expect(errors).toContainEqual({
        target: {
          action: ShoppingCartAction.ADD,
          productId: 'product-id',
          quantity: 2.5,
        },
        value: 2.5,
        property: 'quantity',
        children: [],
        constraints: { isInt: 'quantity must be an integer number' },
      });
    });

    it('should return ValidationError (productId must be a string)', async () => {
      const errors = await validator.validate(plainToClass(ShoppingCartUpdateDto, {
        action: ShoppingCartAction.ADD,
        productId: 3,
        quantity: 1,
      }));

      expect(errors).toContainEqual({
        target: {
          action: ShoppingCartAction.ADD,
          productId: 3,
          quantity: 1,
        },
        value: 3,
        property: 'productId',
        children: [],
        constraints: { isString: 'productId must be a string' },
      });
    });

    it('should return ValidationError (action must be a valid enum value)', async () => {
      const errors = await validator.validate(plainToClass(ShoppingCartUpdateDto, {
        action: 'not-supported-action',
        productId: 'product-id',
        quantity: 1,
      }));

      expect(errors).toContainEqual({
        target: {
          action: 'not-supported-action',
          productId: 'product-id',
          quantity: 1
        },
        value: 'not-supported-action',
        property: 'action',
        children: [],
        constraints: { isEnum: 'action must be a valid enum value' }
       });
    });
  });
});