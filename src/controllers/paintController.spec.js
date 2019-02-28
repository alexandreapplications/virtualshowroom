var controller = require("./paintController");
describe("paintController", () => {
  describe("get", () => {
    test("should get data", () => {
      const status = jest.fn();
      const statusGet = jest.fn();
      status.mockReturnValue({
        send: statusGet.mockRejectedValue("200")
      });
      const res = {
        status: status
      };

      var call = controller.get(null, res, null);
      expect(statusGet).toBeCalled();
    });
  });
  describe("post", () => {
    test("should post data", () => {
      const status = jest.fn();
      const statusGet = jest.fn();
      status.mockReturnValue({
        send: statusGet.mockRejectedValue("200")
      });
      const res = {
        status: status
      };

      var call = controller.post(null, res, null);
      expect(statusGet).toBeCalled();
    });
  });
  describe("put", () => {
    test("should put data", () => {
      req = {
        params: {
          id: 10
        }
      };

      const status = jest.fn();
      const statusGet = jest.fn();
      status.mockReturnValue({
        send: statusGet.mockRejectedValue("200")
      });
      const res = {
        status: status
      };

      var call = controller.put(req, res, null);
      expect(statusGet).toBeCalled();
    });
  });
  describe("delete", () => {
    test("should delete data", () => {
      req = {
        params: {
          id: 10
        }
      };
      const status = jest.fn();
      const statusGet = jest.fn();
      status.mockReturnValue({
        send: statusGet.mockRejectedValue("200")
      });

      const res = {
        status: status
      };

      var call = controller.delete(req, res, null);
      expect(statusGet).toBeCalled();
    });
  });
});
