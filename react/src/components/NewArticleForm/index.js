import React, { Component } from 'react'
import { LoginButton, Header } from '../../helpers/theme'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import styled from 'styled-components'
import { WithContext as ReactTags } from 'react-tag-input';
import { Formik } from 'formik'
import { create } from '../../helpers/articlesApi'
import { getAll } from '../../helpers/tagsApi'

const KeyCodes = {
  comma: 188,
  enter: 13,
}

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const PanelNewArticle = styled.div` 
    background-color: rgba(0,0,0,0.5);
    padding: 30px;
    width: 80%;
    margin: 20px auto; 
    overflow: hidden;
    text-overflow: ellipsis;
`
const LabelTitle = styled.label` 
  font-family: 'Lobster', cursive;
  font-size: 50px;
`
const InputTitle = styled.input` 
  font-family: 'Lobster', cursive;
  font-size: 30px;
  background-color: transparent;
  width: 90%;
  border:none;
  border-bottom: 5px solid white;
  color: white;
  margin: -2px 10px;
`

const StyledLogo = styled.img`
    border-radius: 8px;
    margin-right: 30px;
    width: 100% 
`


class NewArticleForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      suggestions: []
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  componentDidMount(){
    getAll().then(response => {
      let suggestions = response.map((suggestion) => {return {"id" : suggestion.text, 'text': suggestion.text }});
      this.setState({ suggestions })
    })
  }

  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  handleDrag(tag, currPos, newPos) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    this.setState({ tags: newTags });
  }

  state = {
    body: null,
    title: null,
    file: '',
    imagePreviewUrl: ''
  }

  _handlerTitleChange = event => {
    this.setState({ title: event.target.value })
  }

  convertToHtml = (text) => {
    return { __html: text };
  }

  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }




  render() {
    const { tags, suggestions, body } = this.state
    let { imagePreviewUrl } = this.state;
    let imagePreview = null;

    if (imagePreviewUrl) {
      imagePreview = (<StyledLogo src={imagePreviewUrl} />);
    } else {
      imagePreview = (<div className="previewText">Please select an Image</div>);
    }

    return (
      <div>
        <Formik
          onSubmit={(values) => {
            create({ 'tags': tags, 'title': values.title, 'body': body, 'url': imagePreviewUrl }).then(response => {
              console.log(response)
            })
          }}

          render={({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting
          }) => (
              <form onSubmit={handleSubmit}>
                <PanelNewArticle>
                  {imagePreview}
                  <Header>{values.title}</Header>
                  <div dangerouslySetInnerHTML={this.convertToHtml(body)} />
                </PanelNewArticle>
                <PanelNewArticle>
                  <ReactTags
                    classNames={{
                      tags: 'tagsClass',
                      tagInput: 'tagInputClass',
                      tagInputField: 'tagInputFieldClass',
                      selected: 'selectedClass',
                      tag: 'tagClass',
                      remove: 'removeClass',
                      suggestions: 'suggestionsClass',
                      activeSuggestion: 'activeSuggestionClass'
                    }}
                    tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters} />
                  <br />
                  <input className="fileInput"
                    type="file"
                    onChange={(e) => this._handleImageChange(e)} />
                  <div className="form-group">
                    <LabelTitle>Title: </LabelTitle>
                    <InputTitle name="title" onChange={handleChange} value={values.title || ''} />
                  </div>
                  <CKEditor
                    name="body"
                    editor={ClassicEditor}
                    data={values.body || ''}
                    onInit={editor => {
                      // You can store the "editor" and use when it is needed.
                      console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                      this.setState({ body: editor.getData() })
                    }}
                    onBlur={editor => { 
                    }}
                    onFocus={editor => {
                    }}
                  />
                  <LoginButton type='submit'>Add new</LoginButton>
                </PanelNewArticle>
              </form>
            )} />
      </div>
    )
  }
}

export default NewArticleForm