// Tests using jsDom are deprecated. Port tests to commonjs and add them to test/karma.

describe('A Group of Form Models', function() {

  //*****************************************************
  //* Legend:
  //* F1, F2, etc. = Form Model 1, Form Model 2, etc.
  //* F(ABC) = Form Model with attributes: A, B and C
  //* O1, O2, etc. = Object Model 1, Object Model 2, etc.
  //* O(ABC) = Object Model with attributes: A, B, and C
  //******************************************************

  it('can validate more than one form models to produce a total validation report');

  /**
   * F(AB) - - - > O(ABC)
   * F(CD) - <
   * F(EF) - - - > O(DEF)
   */
  it('can coordinate a save to fields on multiple Object models using 1-to-1 fields from multiple form models');

  /**
   * F(B) - - - > O(G)
   * F(CD) - <
   * F(E) - - - > O(H)
   *
   * G is a combination of B and C
   * H is a combination of D and E
   */
  it('can coordinate a save to a single field on multiple Object models using fields from multiple form models');

  it('will push changes to multiple Object Models only after total validation success');

  /**
   * F(A) - \
   *           - > O(AB)
   * F(B) - /
   */
  it('can coordinate a save to fields on a single Object model using 1-to-1 fields from multiple form models');

  /**
   * F(A) - \
   *           - > O(C)
   * F(B) - /
   *
   * C is a combination of A and B
   */
  it('can coordinate a save to a single Object model field using a field from each of the multiple form models');

  it('will push changes to a single Object Model only after total validation success');

  it('can revert all changes to an Object Model after pushing new information to the Object Model fails');

  it('can revert all changes to all Object Models after pushing new information to multiple Object Models fails');

  /**
   * F1 - \
   *        - > O
   * F2 - /
   */
  it('can update each form model if a save (push to server) on a single Object Model fails');

  /**
   * F1 - - - > O1
   * F2 - <
   * F3 - - - > O2
   *
   */
  it('can update each form model if a save (push to server) on an Object Model fails when saving multiple Object Models');

  it('can trigger a save on the Object Model(s) after total validation and successfully pushing new data to it');

  it('updates to the Form Models do not automatically affect the Object Model(s) without explicit call to save');
})
