import { useEffect, useState } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";

function App() {
  const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

  const [person, setPerson] = useState([]);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random person");

  const getUsers = async () => {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    const person = data.results[0];
    console.log(person);
    const { first, last } = person.name;

    const { email } = person;
    const { age } = person.dob;

    const { password } = person.login;

    const { name, number } = person.location.street;

    const { phone } = person;
    const { large: image } = person.picture;

    const newUser = {
      name: `${first} ${last}`,
      email,
      age,
      street: `${number} ${name} `,
      phone,
      image,
      password,
    };

    setPerson(newUser);
    setTitle("name");
    setValue(newUser.name);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleMouse = (e) => {
    if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(person[newValue]);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="bg-dark"></div>
        <div className="card">
          <img className="image" src={person.image} alt="" />
          <p className="title">my {title} is</p>
          <p className="name">{value}</p>
          <div className="buttons">
            <button
              className="icon"
              data-label="name"
              onMouseEnter={handleMouse}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseEnter={handleMouse}
            >
              <FaEnvelopeOpen />
            </button>
            <button
              className="icon"
              data-label="age"
              onMouseEnter={handleMouse}
            >
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseEnter={handleMouse}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseEnter={handleMouse}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseEnter={handleMouse}
            >
              <FaLock />
            </button>
          </div>
          <button className="other-user" onClick={() => getUsers()}>
            Random User
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
