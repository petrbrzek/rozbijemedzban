import React from 'react'
import Head from '../src/components/head'
import { graphql, compose } from 'react-apollo'
import Modal from 'react-responsive-modal'
import Confetti from 'react-confetti'
import sizeMe from 'react-sizeme'
import Linkify from 'react-linkify'

import withData from '../src/apollo-setup/with-data'

import { listAllGifts, reserveGift, isGiftReserved } from '../src/queries'

const GiftBox = ({ gift, requestClick }) => {
  return (
    <div className="gift-box">
      <div className="gift-info">
        <h2>{gift.title}</h2>
        <p>
          <Linkify>{gift.desc}</Linkify>
        </p>
      </div>
      <div className="gift-button-box">
        <button disabled={gift.reserved} onClick={() => requestClick(gift.id)}>
          {gift.reserved ? (
            <span>
              🎉 Rezervováno -{' '}
              {gift.who ? <i className="who">{gift.who}</i> : ''}
            </span>
          ) : (
            'Zamluvit dárek'
          )}
        </button>
      </div>
    </div>
  )
}

const EnhancedConfetti = sizeMe({ monitorHeight: true, monitorWidth: true })(
  class InternalConfetti extends React.Component {
    render() {
      return (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Confetti {...this.props.size} />
        </div>
      )
    }
  }
)

class GiftsPage extends React.Component {
  state = this._getInitState()

  _getInitState() {
    return {
      modalOpen: false,
      pendingReservationId: null,
      reservationLoading: false,
      serverError: false,
      inputError: false,
      alreadyReservedError: false,
      whoReserved: '',
      didReserve: false,
    }
  }

  handleModalClose = () => {
    this.setState(this._getInitState())
  }

  openModalBeforeReservation = id => {
    this.setState({
      modalOpen: true,
      pendingReservationId: id,
    })
  }

  handleReservation = async () => {
    if (!this.state.whoReserved) {
      this.setState({
        inputError: true,
      })
      return
    }

    this.setState({
      reservationLoading: true,
    })

    try {
      const gift = await this.props.client.query({
        query: isGiftReserved,
        fetchPolicy: 'network-only',
        variables: {
          id: this.state.pendingReservationId,
        },
      })
      if (gift && gift.data && gift.data.Gift && gift.data.Gift.reserved) {
        throw new Error('already-reserved')
      }

      const reservedGift = await this.props.reserveGift({
        variables: {
          id: this.state.pendingReservationId,
          who: this.state.whoReserved,
        },
      })
      if (this.props.gifts) {
        this.props.gifts.refetch()
      }
      this.handleModalClose()
      this.showSomeLove()
    } catch (error) {
      console.error('Error #handleReservation: ', error)
      if (error.message === 'already-reserved') {
        this.setState({
          alreadyReservedError: true,
        })
        if (this.props.gifts) {
          this.props.gifts.refetch()
        }
        return
      }
      this.setState({
        serverError: true,
      })
    }
  }

  showSomeLove = () => {
    this.setState({
      didReserve: true,
    })
    setTimeout(() => {
      this.setState({
        didReserve: false,
      })
    }, 10000)
  }

  handleInputChange = event => {
    const { value } = event.target

    this.setState({
      whoReserved: value,
      inputError: false,
    })
  }

  render() {
    const { gifts } = this.props

    let content
    if (gifts && gifts.loading) {
      content = <h1 className="loading">Načítám dary...</h1>
    }

    let alreadyReserved = []
    if (gifts && gifts.allGifts) {
      const { allGifts } = gifts
      alreadyReserved = allGifts.filter(gift => gift.reserved)
      content = allGifts
        .filter(gift => !gift.reserved)
        .map(gift => (
          <GiftBox
            gift={gift}
            key={gift.id}
            requestClick={this.openModalBeforeReservation}
          />
        ))
    }

    const noError = !this.state.alreadyReservedError && !this.state.serverError

    return (
      <div className="root">
        <Head />
        <h1 className="headline">🎁 Seznam darů</h1>

        <div className="layout">{content}</div>

        {alreadyReserved.length ? (
          <div className="layout">
            <h2 className="reserved-headline fancy">
              <span>Již rezervované dary</span>
            </h2>
            {alreadyReserved.map(gift => <GiftBox gift={gift} key={gift.id} />)}
          </div>
        ) : null}

        <Modal
          open={this.state.modalOpen}
          onClose={this.handleModalClose}
          center
        >
          <h2>Už máš téměř rezervováno.</h2>
          <p>
            Zapiš se k daru svou přezdívkou tak, abychom nepoznali od koho dárek je.<br />
            Přezdívka bude u daru zobrazena.
          </p>

          {this.state.alreadyReservedError ? (
            <p className="error">
              <br />Právě v tento moment si už někdo jiný rezervoval tento
              dárek, což je fakt smůla 🤣.
            </p>
          ) : null}

          {this.state.serverError ? (
            <p className="error">
              <br />Nastala chyba, což je fakt nepříjemný. Kontaktuj Petra 🤓
            </p>
          ) : null}

          {noError ? (
            <div>
              <form className="reservation-box">
                <input
                  type="text"
                  placeholder="Tvoje tajná přezdívka"
                  className="input"
                  onChange={this.handleInputChange}
                  value={this.state.whoReserved}
                />

                <button
                  onClick={this.handleReservation}
                  disabled={this.state.reservationLoading}
                >
                  {this.state.reservationLoading
                    ? 'Prosím čekejte'
                    : 'Potvrdit rezervaci'}
                </button>
              </form>
              {this.state.inputError ? <p>Vyplň prosím přezdívku 🙏</p> : null}
            </div>
          ) : null}
        </Modal>

        {this.state.didReserve ? <EnhancedConfetti /> : null}

        <style global jsx>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          @font-face {
            font-family: 'Gotham';
            src: url('https://cldup.com/GoUKsiJHY5.eot');
            src: url('https://cldup.com/GoUKsiJHY5.eot?#iefix')
                format('embedded-opentype'),
              url('https://cldup.com/56DqDDRMNy.woff2') format('woff2'),
              url('https://cldup.com/jL8uvoxVkp.woff') format('woff'),
              url('https://cldup.com/zvyd2sKPlE.ttf') format('truetype');
            font-weight: 500;
            font-style: normal;
          }
          @font-face {
            font-family: 'Gotham';
            src: url('https://cldup.com/Nzugi9bWhF.eot');
            src: url('https://cldup.com/Nzugi9bWhF.eot?#iefix')
                format('embedded-opentype'),
              url('https://cldup.com/C9Y1N5Qf43.woff2') format('woff2'),
              url('https://cldup.com/pixHn5aVxl.woff') format('woff'),
              url('https://cldup.com/ucdaZLKgg7.ttf') format('truetype');
            font-weight: bold;
            font-style: normal;
          }
          html,
          body {
            font-size: 10px;
            background: #d0d0d0;
            background-color: #dfdbe5;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            font-family: 'Open Sans', sans-serif;
            line-height: 1.5;
          }
          .layout {
            width: 700px;
            padding: 0 1rem 5rem;
            margin: auto;
          }
          p {
            font-size: 2rem;
          }
          h1,
          h2,
          h3 {
            font-family: Gotham, sans-serif;
            font-size: 3rem;
            line-height: 1.1;
            letter-spacing: -0.2rem;
          }
          h2 {
            padding-bottom: 1rem;
          }
          .root {
            font-size: 2rem;
          }
          a {
            color: #9468e0;
            text-decoration: none;
            word-wrap: break-word;
          }
          @media (max-width: 700px) {
            html,
            body {
              font-size: 8px;
            }
            .layout {
              width: 100%;
            }
          }
          .headline {
            text-align: center;
            padding: 2rem 0;
            background: #fff;
          }
          .gift-box {
            background: #fff;
            padding: 2rem;
            margin: 2rem;
            display: flex;
            justify-content: space-between;
          }
          .gift-box:first-of-type {
            margin-top: 3rem;
          }
          .gift-box:last-child {
            margin-bottom: 1rem;
          }
          .gift-info {
            flex: 1;
          }
          .gift-button-box {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          button {
            background: #9468e0;
            padding: 1rem;
            color: #fff;
            border: none;
            border-radius: 3px;
            font-weight: bold;
            font-size: 1.5rem;
            text-transform: uppercase;
            cursor: pointer;
          }
          button:hover {
            background: #b192e6;
          }
          button:disabled {
            background: #7f798a;
            cursor: default;
          }
          .loading {
            text-align: center;
            color: #000;
            font-size: 4rem;
            padding: 3rem 0;
          }
          .reserved-headline {
            text-align: center;
            text-transform: uppercase;
          }
          @media (max-width: 650px) {
            .gift-box {
              flex-direction: column;
            }
            .gift-info {
              flex-direction: row;
            }
            .gift-button-box {
              margin-top: 3rem;
            }
            .fancy {
              display: none;
            }
          }
          .fancy {
            line-height: 0.6;
            text-align: center;
          }
          .fancy span {
            display: inline-block;
            position: relative;
          }
          .fancy span:before,
          .fancy span:after {
            content: '';
            position: absolute;
            height: 5px;
            border-bottom: 5px solid #000;
            top: 0;
            width: 130px;
          }
          .fancy span:before {
            right: 100%;
            margin-right: 15px;
          }
          .fancy span:after {
            left: 100%;
            margin-left: 15px;
          }
          .input {
            border: 1px solid #999;
            border-radius: 3px;
            padding: 1rem 0.5rem;
            font-size: 1.5rem;
            flex: 1;
            margin-right: 1rem;
          }
          .reservation-box {
            margin-top: 2rem;
            display: flex;
            padding-bottom: 2rem;
          }
          .error {
            color: red;
          }
        `}</style>
      </div>
    )
  }
}

const GiftsPageContent = compose(
  graphql(listAllGifts, {
    name: 'gifts',
  }),
  graphql(reserveGift, {
    name: 'reserveGift',
  })
)(GiftsPage)

export default withData(GiftsPageContent)
