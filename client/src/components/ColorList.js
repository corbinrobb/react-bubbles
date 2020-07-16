import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addingColor, setAddingColor] = useState(false);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors(colors.map(color => {
          if(color.id === colorToEdit.id) return res.data;
          return color;
        }));
      })
      .catch(err => console.log(err));
      setColorToEdit(initialColor);
      setEditing(false);
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        updateColors(colors.filter(c => c.id !== res.data));
      })
      .catch(err => console.log(err));
  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/colors', newColor)
      .then(res => {
        updateColors(res.data);
      })
      .catch(err => console.log(err));
    setNewColor(initialColor);
    setAddingColor(false);
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => {
              setEditing(false);
              setAddingColor(false);
            }}>cancel</button>
          </div>
        </form>
      )}
      { !addingColor && !editing && <button onClick={() => setAddingColor(true)}>Add New Color?</button>}
      {addingColor && !editing && (<form onSubmit={addColor}>
        <legend>Add color</legend>
        <label>
          color name:
            <input
            onChange={e =>
              setNewColor({ ...newColor, color: e.target.value })
            }
            value={newColor.color}
          />
        </label>
        <label>
          hex code:
            <input
            onChange={e =>
              setNewColor({
                ...newColor,
                code: { hex: e.target.value }
              })
            }
            value={newColor.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">Add Color</button>
          <button onClick={() => setAddingColor(false)}>cancel</button>
        </div>
      </form>)}
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
