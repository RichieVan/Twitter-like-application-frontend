import React from 'react';

function CustomForm({
  formClass = null,
  inputGroupClass = null,
  layout = {
    about: {

    },
  },

}) {
  const classList = {
    form: formClass || 'default-form',
    inputGroup: inputGroupClass || 'default-form',
  };

  return (
    <form action="" className="default-form">
      <div className="settings-group">
        <div className="settings-group_name">
          <span>Аватар</span>
        </div>
        <div className="setting">
          <div className="avatar" style={avatarStyles}>
            <a
              className="upload-new"
              onClick={() => {
                setIsUpdatingAvatar(true);
                setModalHeading('Обновление аватара');
                setGoBack({
                  f: setIsUpdatingAvatar,
                  v: false,
                });
              }}
            >
              <FontAwesomeIcon icon={faUpload} />
            </a>
          </div>
        </div>
      </div>
      <div className="settings-group">
        <div className="settings-group_name">
          <span>Основная информация</span>
        </div>
        <div className="setting input-container">
          <div className="setting_input">
            <div className="validation-requirements">
              {Object.keys(validators.username).map((val) => {
                if (typeof validators.username[val] === 'function') return;
                const result = validators.username[val].validate(userData.username).lettersCount;

                return (
                  <div
                    key={`username_${val}`}
                    className="val-req"
                    data-validator={val}
                    data-validated={validators.username[val].validated}
                    title={validators.username[val].title}
                  >
                    {result}
                  </div>
                );
              })}
            </div>
            <input
              type="text"
              name="username"
              id="stng_username"
              value={userData.username}
              data-empty={!userData.username}
              onChange={(e) => {
                setUserData({ ...Object.assign(userData, { username: e.target.value }) });
              }}
            />
            <label htmlFor="stng_username">Имя пользователя</label>
          </div>
        </div>
        <div className="setting input-container">
          <div className="setting_input">
            <div className="validation-requirements">
              {Object.keys(validators.about).map((val) => {
                const validator = validators.about[val];

                if (typeof validator === 'function') return;
                const result = validator.validate(userData.about).lettersCount;

                return (
                  <div
                    key={`about_${val}`}
                    className="val-req"
                    data-validator={val}
                    data-validated={validator.validated}
                    title={validator.title}
                  >
                    {result}
                    <FontAwesomeIcon icon={validator.icon} />
                  </div>
                );
              })}
            </div>
            <textarea
              name="about"
              id="stng_about"
              rows="4"
              value={userData.about}
              data-empty={!userData.about}
              data-validated={validators.about.isValidated()}
              onChange={(e) => {
                setUserData({ ...Object.assign(userData, { about: e.target.value }) });
              }}
            >
              {userData.about}
            </textarea>
            <label htmlFor="stng_about">О себе</label>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CustomForm;
