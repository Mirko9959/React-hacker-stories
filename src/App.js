import React from "react";

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id={"search"}
        label={"Search"}
        value={searchTerm}
        onInputChange={handleChange}
      />

      <hr />

      <List list={searchedStories} />
    </>
  );
};

const InputWithLabel = ({ id, label, value, onInputChange, type = "text" }) => (
  <div>
    <label htmlFor="id">{label}: </label>
    &nbsp;
    <input id={id} type={type} onChange={onInputChange} value={value} />
  </div>
);

const List = ({ list }) =>
  list.map((item) => <Item key={item.objectID} item={item} />);
const Item = ({ item }) => (
  <div>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
  </div>
);

export default App;
