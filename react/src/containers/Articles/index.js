import React, { Component } from 'react';
import Article from '../../components/Article'
import styled from 'styled-components'
import * as articlesApi from '../../helpers/articlesApi'
import * as _ from 'ramda'
import $ from 'jquery'
import Loading from '../../components/Loading'
import { Header }  from '../../helpers/theme'
import { Link } from 'react-router-dom'
import logo from '../../images/pobrane.jpg'

const HeaderArticles = styled(Header)`
  && {
    font-size: 80px
  }
`


class Articles extends Component {

  componentDidMount = async () => {
    $( "#articles" ).addClass( "active")
    const articles = await articlesApi.getAll()
    this.setState({ articles, fetched: true })
  }

  static defaultProps = {
    tasks: [],
    articles: [],
    title: "Articles"
  }

  state = {
    fetched: false,
    articles: [],
    body: '',
    title: '',
    currentPage: 1,
    articlesPerPage: 3,
    upperPageBound: 3,
    lowerPageBound: 0,
    isPrevBtnActive: 'disabled',
    isNextBtnActive: '',
    pageBound: 3
  }

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this)
    this.btnDecrementClick = this.btnDecrementClick.bind(this)
    this.btnIncrementClick = this.btnIncrementClick.bind(this)
    this.btnNextClick = this.btnNextClick.bind(this)
    this.btnPrevClick = this.btnPrevClick.bind(this)
    this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this)
  }

  componentDidUpdate() {
    $("ul li.active").removeClass('active')
    $('ul li#' + this.state.currentPage).addClass('page-item active')
  }

  componentWillUnmount(){
    $( "#articles" ).removeClass( "active")
  }

  handleClick(event) {
    let listid = Number(event.target.id);
    this.setState({
      currentPage: listid
    });
    $("ul li.active").removeClass('active');
    $('ul li#' + listid).addClass('page-item active');
    this.setPrevAndNextBtnClass(listid);
  }

  setPrevAndNextBtnClass(listid) {
    let totalPage = Math.ceil(this.state.articles.length / this.state.articlesPerPage);
    this.setState({ isNextBtnActive: 'disabled' });
    this.setState({ isPrevBtnActive: 'disabled' });
    if (totalPage === listid && totalPage > 1) {
      this.setState({ isPrevBtnActive: '' });
    }
    else if (listid === 1 && totalPage > 1) {
      this.setState({ isNextBtnActive: '' });
    }
    else if (totalPage > 1) {
      this.setState({ isNextBtnActive: '' });
      this.setState({ isPrevBtnActive: '' });
    }
  }

  btnIncrementClick() {
    this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
    this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
    let listid = this.state.upperPageBound + 1;
    this.setState({ currentPage: listid });
    this.setPrevAndNextBtnClass(listid);
  }

  btnDecrementClick() {
    this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
    this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
    let listid = this.state.upperPageBound - this.state.pageBound;
    this.setState({ currentPage: listid });
    this.setPrevAndNextBtnClass(listid);
  }

  btnPrevClick() {
    if ((this.state.currentPage - 1) % this.state.pageBound === 0) {
      this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
      this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
    }
    let listid = this.state.currentPage - 1;
    this.setState({ currentPage: listid });
    this.setPrevAndNextBtnClass(listid);
  }
  btnNextClick() {
    if ((this.state.currentPage + 1) > this.state.upperPageBound) {
      this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
      this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
    }
    let listid = this.state.currentPage + 1;
    this.setState({ currentPage: listid });
    this.setPrevAndNextBtnClass(listid);
  }

  updateTitle = event => {
    this.setState({ title: event.target.value })
  }

  updateBody = event => {
    this.setState({ body: event.target.value })
  }

  addNewArticle = async () => {
    const { articles, body, title } = this.state
    const article = await articlesApi.create({ body: body, title: title })
    this.setState({ articles: _.append(article, articles), body: '', title: '' })
  }

  findById = (id, arr) => {
    const index = _.findIndex(_.propEq('id', id))(arr)
    return { index, article: arr[index] }
  }

  destroyArticle = async (id) => {
    const { articles } = this.state
    await articlesApi.destroy(id)
    const { index } = this.findById(id, articles)
    this.setState({ articles: _.remove(index, 1, articles) })
  }


  updateArticle = async (id) => {
    const { articles, title, body } = this.state
    const response = await articlesApi.update(id, { title: title, body: body })
    const { index } = this.findById(id, articles)

    this.setState({ articles: _.update(index, response, articles) })
  }

  render() {
    const { articles, currentPage, articlesPerPage, upperPageBound, lowerPageBound, isPrevBtnActive, isNextBtnActive } = this.state;
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const renderArticles = currentArticles.map(article => {
      return <Article destroy={this.destroyArticle} id={article.id} key={article.id} title={article.title} body={article.body} author={article.user.name} author_id={article.user.id} image ={article.image?article.image.url:logo}/>
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(articles.length / articlesPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      if (number === 1 && currentPage === 1) {
        return (
          <li key={number} className='page-item active' id={number}><Link className="page-link" to='#' id={number} onClick={this.handleClick}>{number}</Link></li>
        )
      }
      else if ((number < upperPageBound + 1) && number > lowerPageBound) {
        return (
          <li key={number} id={number}><Link className="page-link" to='#' id={number} onClick={this.handleClick}>{number}</Link></li>
        )
      }else{
        return null
      }
    });
    let pageIncrementBtn = null;
    if (pageNumbers.length > upperPageBound) {
      pageIncrementBtn = <li className=''><Link className="page-link" to='#' onClick={this.btnIncrementClick}> &hellip; </Link></li>
    }
    let pageDecrementBtn = null;
    if (lowerPageBound >= 1) {
      pageDecrementBtn = <li className=''><Link className="page-link" to='#' onClick={this.btnDecrementClick}> &hellip; </Link></li>
    }
    let renderPrevBtn = null;
    if (isPrevBtnActive === 'disabled') {
      renderPrevBtn = <li className={isPrevBtnActive}><span className="page-link" id="btnPrev"> Prev </span></li>
    }
    else {
      renderPrevBtn = <li className={isPrevBtnActive}><Link className="page-link" to='#' id="btnPrev" onClick={this.btnPrevClick}> Prev </Link></li>
    }
    let renderNextBtn = null;
    if (isNextBtnActive === 'disabled') {
      renderNextBtn = <li className={isNextBtnActive}><span className="page-link" id="btnNext"> Next </span></li>
    }
    else {
      renderNextBtn = <li className={isNextBtnActive}><Link className="page-link" to='#' id="btnNext" onClick={this.btnNextClick}> Next </Link></li>
    }

    return (
      <div>
        <HeaderArticles>{this.props.title}</HeaderArticles>
        {this.state.fetched ?
          <div>
            <nav aria-label="Page navigation example">
              <ul>
                {renderArticles}
              </ul>
              <ul className="pagination justify-content-center">
                {renderPrevBtn}
                {pageDecrementBtn}
                {renderPageNumbers}
                {pageIncrementBtn}
                {renderNextBtn}
              </ul>
            </nav>
          </div>
          : <Loading/>}
      </div>
    )
  }
}


export default Articles
