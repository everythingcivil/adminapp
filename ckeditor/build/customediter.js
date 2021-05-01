DecoupledDocumentEditor
  .create(document.querySelector('.editor'), {

    toolbar: {
      items: [
        'heading',
        '|',
        'fontSize',
        'fontFamily',
        '|',
        'fontColor',
        'fontBackgroundColor',
        'highlight',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'alignment',
        '|',
        'numberedList',
        'bulletedList',
        '|',
        'outdent',
        'indent',
        '|',
        'horizontalLine',
        'todoList',
        'link',
        'blockQuote',
        'insertTable',
        'MathType',
        'subscript',
        'superscript',
        'specialCharacters',
        '|',
        'undo',
        'redo',
        'code',
        'codeBlock',
        'imageInsert',
        'ChemType',
        'pageBreak',
        'imageUpload',
        'mediaEmbed',
      ]
    },
    language: 'en',
    image: {
      toolbar: [
        'imageTextAlternative',
        'imageStyle:full',
        'imageStyle:side'
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties'
      ]
    },
    licenseKey: '',
    placeholder: 'Type the content here!',
  })
  .then(editor => {
    window.editor = editor;
    document.querySelector('.document-editor__toolbar').appendChild(editor.ui.view.toolbar.element);
    document.querySelector('.ck-toolbar').classList.add('ck-reset_all')
  })
  .catch(error => {
    console.error('Oops, something went wrong!')
    console.error(error)
  });

var firebaseConfig = {
  apiKey: "AIzaSyB4KVH62_v1G2JNRTG57d079hpEqpyOqdQ",
  authDomain: "everythingcivil-acc50.firebaseapp.com",
  projectId: "everythingcivil-acc50",
  storageBucket: "everythingcivil-acc50.appspot.com",
  messagingSenderId: "554847757205",
  appId: "1:554847757205:web:0754c67516a42d5dbd8c9c",
  measurementId: "G-VMT4T5VBC9"
}

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    //console.log(user)
  } else {
    window.location.href = "/"
  }
})

function fetchdata(docid) {
  firebase.firestore().collection("posts").doc(docid).get().then((doc) => {
      editor.setData(doc.data().content)
    })
    .catch((e) => {
      console.log(e)
    });
}

document.querySelector('#savecontent').addEventListener('click', () => {
  const editorData = editor.getData()
  let docid = location.search.substring(1)
  const postRef = firebase.firestore().collection("posts").doc(docid)

  postRef.get().then((doc) => {
    if (!doc.exists) return;
  });

  postRef.update({
      content: editorData,
    })
    .then(() => {
      alert("Data saved successfully!")
    })
    .catch((e) => {
      console.log(e);
    })
})

function goback() {
  if (confirm("Close Window?")) {
    close()
  }
}

fetchdata(location.search.substring(1));