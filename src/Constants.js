prod = {
  url: {
    API_URL: 'https://trello-clone-django.herokuapp.com'
  }
}

const dev = {
  url: {
    API_URL: 'localhost:8000'
  }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;