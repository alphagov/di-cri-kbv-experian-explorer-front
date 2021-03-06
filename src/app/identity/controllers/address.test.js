const BaseController = require("hmpo-form-wizard").Controller;
const AddressController = require("./address");

describe("address controller", () => {
  const address = new AddressController({ route: "/test" });

  it("should be an instance of BaseController", () => {
    expect(address).to.be.an.instanceOf(BaseController);
  });
});
