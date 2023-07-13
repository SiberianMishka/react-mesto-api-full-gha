import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import auth from '../utils/auth';

export default function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [regError, setRegError] = React.useState(false);
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    loggedIn && Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then((res) => {
        const [userData, cardsData] = res;
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch(err => console.log(err));
  }, [loggedIn]);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/", { replace: true });
            setEmail(res.email);
          }
        })
        .catch(err => console.log(err));
    }
  }, [navigate]);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(id => id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser(userData) {
    api.setUserInfo(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api.setAvatar(avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  const handleChangeForm = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleRegister = (e) => {
    e.preventDefault();
    const { password, email } = formValue;
    auth.register(password, email)
      .then((res) => {
        setRegError(false);
        setIsInfoToolTipOpen(true);
        setFormValue({ username: '', password: '' });
        navigate('/sign-in', { replace: true });

      })
      .catch(err => {
        setRegError(true);
        setIsInfoToolTipOpen(true);
        console.log(err);
      });
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth.authorize(formValue.password, formValue.email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setEmail(formValue.email);
          setFormValue({ username: '', password: '' });
          setLoggedIn(true);
          navigate('/', { replace: true });
        }

      })
      .catch(err => {
        setRegError(true);
        setIsInfoToolTipOpen(true);
        console.log(err);
      });
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setEmail('');
    navigate('/sign-in', { replace: true });
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={email}
          onSignOut={handleSignOut}
        />
        <Routes>
          <Route path="/sign-up" element={
            <Register
              onChange={handleChangeForm}
              onSubmit={handleRegister}
              formValue={formValue}
            />}
          />
          <Route path="/sign-in" element={
            <Login
              onChange={handleChangeForm}
              onSubmit={handleLogin}
              formValue={formValue}
            />}
          />
          <Route path="*" element={<Navigate to="/sign-in" replace />} />
          <Route path="/" element={
            <ProtectedRoute
              component={Main}
              onEditProfile={() => setIsEditProfilePopupOpen(true)}
              onAddPlace={() => setIsAddPlacePopupOpen(true)}
              onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              loggedIn={loggedIn}
            />}
          />
        </Routes>
        {loggedIn && <Footer />}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          regError={regError}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}