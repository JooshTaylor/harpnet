import React from 'react'
import './PubAcc.css'
import { connect } from 'react-redux'
import { loginUser } from '../../../actions/authActions'
import ILoginUser from '../../../interfaces/ILoginUser'

interface Props {
  loginUser(userData: ILoginUser): void
}

class PubAcc extends React.Component<Props, {}> {
  private publicAccount = (e: string): void => {
    const botInfo: any = {}

    switch (e) {
      default:
        return null
      case 'account-1':
        botInfo.userOrEmail = 'Harper'
        botInfo.password = 'harperpassword'
        break
      case 'account-2':
        botInfo.userOrEmail = 'Harphene'
        botInfo.password = 'harphenepassword'
        break
      case 'account-3':
        botInfo.userOrEmail = 'Bailey'
        botInfo.password = 'baileypassword'
        break
    }

    this.props.loginUser(botInfo)
  }

  public render() {
    return (
      <div className='public'>
        <div className='account'>
          <button
            onClick={() => this.publicAccount('account-1')}
            type='button'
            className='account-link'
            data-testid='acc1'
          >
            <img
              className='account-img'
              src='https://robohash.org/Harper/?200x200'
              alt='user1'
            />
          </button>
          <h2 className='account-name'>Harper</h2>
        </div>

        <div className='account'>
          <button
            onClick={() => this.publicAccount('account-2')}
            type='button'
            className='account-link'
          >
            <img
              className='account-img'
              src='https://robohash.org/Harphene/?200x200'
              alt='user2'
            />
          </button>
          <h2 className='account-name'>Harphene</h2>
        </div>

        <div className='account'>
          <button
            onClick={() => this.publicAccount('account-3')}
            type='button'
            className='account-link'
          >
            <img
              className='account-img'
              src='https://robohash.org/Bailey/?200x200'
              alt='user3'
            />
          </button>
          <h2 className='account-name'>Bailey</h2>
        </div>
      </div>
    )
  }
}

// const mapDispatchToProps = (
//   dispatch: ThunkDispatch<{}, {}, any>,
//   ownProps
// ): DispatchProps => {
//   return {
//     loginUser
//   }
// }

//<StateProps, DispatchProps, OwnProps>

export default connect(
  null,
  { loginUser }
)(PubAcc)
