const validationFunctions = {};

validationFunctions.required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

validationFunctions.validEmail = (value) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(value).toLowerCase())) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

validationFunctions.validNameAndLastName = (value) => {
  if (value.length < 2 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 2 and 20 characters.
      </div>
    );
  }
};

validationFunctions.validDate = (value) => {
  if (new Date(value) > new Date() || !value) {
    return (
      <div className="alert alert-danger" role="alert">
        Please enter a valid date
      </div>
    );
  }
};

validationFunctions.validPassword = (value) => {
  if (!value.length === 0) {
    if (value.length < 5 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 5 and 40 characters.
        </div>
      );
    }
  }
};
export default validationFunctions;
