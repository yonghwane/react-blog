import logo from './logo.svg';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function App() {
  let [title_name, setTitlename] = useState(['Sample Title']);
  let [content, setContent] = useState(['Sample Content']);
  let [modal, setModal] = useState(false);
  let [inputbox, setInputbox] = useState(false);
  let [infodefault, SetInfo] = useState(false);
  let [titleValue, Settitlevalue] = useState('');
  let [contentValue, SetContentvalue] = useState('');
  let [listNumber, SetListNumber] = useState(0);
  let [editmode, setEditmode] = useState(false);

  const addInput = () => {
    setTitlename([titleValue, ...title_name]);
    setContent([contentValue, ...content]);
  };

  const handleEditMode = () => {
    setEditmode(true);
  };

  const handleClickSave = () => {
    setEditmode(false);
  };
  const handleEditSave = () => {
    // 수정을 저장하는 로직을 추가
    // 이 예시에서는 title_name 및 content 배열의 해당 인덱스를 수정합니다.
    const updatedTitleName = [...title_name];
    const updatedContent = [...content];
    updatedTitleName[listNumber] = titleValue;
    updatedContent[listNumber] = contentValue;
    setTitlename(updatedTitleName);
    setContent(updatedContent);
    setEditmode(false); // 수정 모드 종료
  };

  return (
    <div className="App">
      <div className='header'>
        <p>Yonghwan's To do list</p>
      </div>
      <div className='sidebar'>
        <div className='list'>
          <div className='new-list-button' onClick={() => {setInputbox(!inputbox)}}>+ New To-Do</div>
          {
            title_name.map(function(a, i) {
              return(
                <div className='list-to-do-title' key={i} onClick={() => {
                  SetListNumber(i);
                }}>
                <FontAwesomeIcon icon={faBars} className="icon"/> {title_name[i]}
                <FontAwesomeIcon icon={faPenToSquare} className="icon" onClick={handleEditMode} />
                <FontAwesomeIcon icon={faTrash} className="icon" onClick={() => {
                  let newTitle = title_name.filter(item => item !== title_name[i]);
                  let newContent = content.filter(item => item !== content[i]);
                  setContent(newContent);
                  setTitlename(newTitle);
                }}/>
                </div>
              )
            })
          }
          <div className='login-status' onClick={() => {SetInfo(true)}}>
          <FontAwesomeIcon icon={faUser} className="icon" />KIM Yonghwan</div>
        </div>
      </div>
      {
      modal == false ? <Modal listNumber={listNumber} title_name={title_name} content={content} /> : null 
      }
      {
        inputbox == true ? <Inputbox addInput={addInput} Settitlevalue={Settitlevalue} SetContentvalue={SetContentvalue} setInputbox={setInputbox} /> : null
      }
      {
      infodefault == true ? <InfoStatus SetInfo={SetInfo} /> : null
      }
{
        editmode == true ? (
          <EditMode
            handleClickSave={handleEditSave}
            Settitlevalue={Settitlevalue}
            SetContentvalue={SetContentvalue}
            titleValue={titleValue} // 수정될 내용을 전달
            contentValue={contentValue} // 수정될 내용을 전달
          />
        ) : null
      }

    </div>
  );
}

function Modal(props) {
  return(
  <div className='modal'>
  <h1>{props.title_name[props.listNumber]}</h1>
  <p>{props.content[props.listNumber]}</p>
  </div>
  )
}

function Inputbox(props) {
  return(
    <div className="input-container">
    <h3>Input your Title and Content</h3>
    <input onChange={(e) => {props.Settitlevalue(e.target.value)}} className="input" type="text" placeholder="Enter your Title" />
    <input onChange={(e) => {props.SetContentvalue(e.target.value)}} className="input-content" type="text" placeholder="Enter your Content" />
    <button className="send-button" onClick={() => {props.addInput(); props.setInputbox(false);}}>
      <FontAwesomeIcon icon={faPlane} />
    </button>
    </div>
  )
}

function InfoStatus(props) {
  return(
    <div className='Info-status'>
    <h3>Kim Yonghwan</h3>
    <p>From Waseda University</p>
    <p>School of Social Science</p>
    <p>Now on Asia Info.</p>
    <p>Live in Meidaimae, Tokyo</p>
    <p className="Close" onClick={() => {props.SetInfo(false)}}>Close</p>
    </div>
  )
}

function EditMode(props) {
  return (
    <div className="edit">
      <input
        onChange={(e) => {
          props.Settitlevalue(e.target.value);
        }}
        value={props.titleValue} // 수정될 내용 표시
      />
      <textarea
        onChange={(e) => {
          props.SetContentvalue(e.target.value);
        }}
        value={props.contentValue} // 수정될 내용 표시
      />
      <button onClick={props.handleClickSave}>Save</button>
    </div>
  );
}

export default App;
