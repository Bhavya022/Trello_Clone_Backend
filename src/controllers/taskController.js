import React, { Component } from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PopUpAddBoard from './../common/PopUpAddBoard';
import { PlaceholderImageRectangular } from './../loaders';

class BoardsMainContentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: null,
      isOpenPrivate: false,
      isUpdated: false,
    };
    this.handleOpenPrivate = this.handleOpenPrivate.bind(this);
    this.handleClosePrivate = this.handleClosePrivate.bind(this);
    this.toggleUpdate = this.toggleUpdate.bind(this);
  }

  toggleUpdate() {
    this.setState({ isUpdated: !this.state.isUpdated });
  }

  async saveTasks() {
    const url = 'http://localhost:5000/api/tasks'; // Ensure this matches your endpoint
    const { jwttoken } = localStorage;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwttoken}`,
        },
      });
      const data = await response.json();
      if (!data.errors) {
        this.setState({ tasks: data });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  handleOpenPrivate() {
    this.setState({ isOpenPrivate: true });
  }

  handleClosePrivate() {
    this.setState({ isOpenPrivate: false });
  }

  componentDidMount() {
    this.saveTasks();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isUpdated !== this.state.isUpdated) {
      this.saveTasks();
    }
  }

  render() {
    const { tasks, isOpenPrivate } = this.state;
    return (
      <div className="content-all-boards">
        {
          tasks ? (
            <div className="boards-page-board-section">
              <div className="boards-page-board-section-header">
                <Icon name='tasks' size='large' />
                <h2>Your Tasks</h2>
              </div>
              <div>
                <ul className="boards-page-board-section-list">
                  {tasks.map(task => (
                    <li className="boards-page-board-section-list-item" key={task._id}>
                      <Link
                        to={'/task/' + task._id}
                        className='board-tile'
                      >
                        <span className='board-tile-details'>
                          <div className='board-tile-details-name'>
                            <p className='board-title-name'>{task.title}</p>
                          </div>
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li className="boards-page-board-section-list-item">
                    <div
                      style={{ backgroundColor: '#F0F2F4' }}
                      className='board-tile'
                    >
                      <div className='board-tile-details'>
                        <Popup
                          basic
                          on="click"
                          open={isOpenPrivate}
                          onOpen={this.handleOpenPrivate}
                          onClose={this.handleClosePrivate}
                          style={{
                            position: "fixed",
                            minWidth: "100vw",
                            minHeight: "100vh",
                            top: -2,
                            left: -2,
                            bottom: -2,
                            right: -2,
                            transform: "none",
                            marginTop: 0,
                            backgroundColor: "rgba(0,0,0,0.5)",
                          }}
                          trigger={
                            <div title="Create new task" className="board-new-tile-div">
                              <p className='board-new-tile'>Create New Task</p>
                            </div>
                          }
                        >
                          <PopUpAddBoard
                            handleClose={this.handleClosePrivate}
                            toggleUpdate={this.toggleUpdate}
                          />
                        </Popup>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            PlaceholderImageRectangular(2)
          )
        }
      </div>
    );
  }
}

export default BoardsMainContentContainer;
