import React, { useContext, useEffect, useState } from "react"
import { Context } from "../..";
import DragAndDrop from "../../lib/components/DragAndDrop/DragAndDrop";

import LoadingMask from '../LoadingMask' ;

import './style.css';

const modifyAndGenerateUrl = (image, sWidth, sHeight, dx, dy, dWidth, dHeight) => {
    const outputImage = document.createElement('canvas');

    outputImage.width = dWidth;
    outputImage.height = dHeight;

    const ctx = outputImage.getContext('2d');
    ctx.drawImage(
        image, 
        dx, 
        dy,
        sWidth,
        sHeight
    );

    const dataURL = outputImage.toDataURL("image/png");
    return dataURL;
}

class AvatarModify extends React.Component {
    constructor(props) {
      super(props);
      this.container = React.createRef();
      this.image = React.createRef();
      this.cutArea = React.createRef();
      this.shiftX = 0;
      this.shiftY = 0;

      this.state = {
          correction : false,
          moving : false,
          scale : 1
      }
    }

    calculateBorders = () => {
        const cutAreaCooordinates = this.cutArea.current.getBoundingClientRect();
        const containerCooordinates = this.container.current.getBoundingClientRect();
        const imageCoordinates = this.image.current.getBoundingClientRect();

        return {
            left: (cutAreaCooordinates.left - containerCooordinates.left) + imageCoordinates.width / 2 - imageCoordinates.width / this.state.scale / 2,
            right: (cutAreaCooordinates.left - containerCooordinates.left) + imageCoordinates.width / 2 - imageCoordinates.width / this.state.scale / 2 + cutAreaCooordinates.width,
            top: (cutAreaCooordinates.top - containerCooordinates.top) + imageCoordinates.height / 2 - imageCoordinates.height / this.state.scale / 2,
            bottom: (cutAreaCooordinates.top - containerCooordinates.top) + imageCoordinates.height / 2 - imageCoordinates.height / this.state.scale / 2 + cutAreaCooordinates.height
        }
    }

    moveAt = (x, y, width, height, borders = this.calculateBorders()) => {
        if (x + width < borders.right) {
            this.image.current.style.left = borders.right - width + 'px';
        } else if (x > borders.left) {
            this.image.current.style.left = borders.left + 'px';
        } else {
            this.image.current.style.left = x + 'px';
        }

        if (y + height < borders.bottom) {
            this.image.current.style.top = borders.bottom - height + 'px';
        } else if (y > borders.top) {
            this.image.current.style.top = borders.top + 'px';
        } else {
            this.image.current.style.top = y + 'px';
        }
    }

    componentDidMount = () => {
        this.image.current.onload = (e) => {
            const initialWidth = this.image.current.getBoundingClientRect().width;
            const initialHeight = this.image.current.getBoundingClientRect().height;
            const ratio = initialWidth / initialHeight; 

            if (ratio >= 1) {
                this.image.current.style.height = this.cutArea.current.getBoundingClientRect().height + ' px';
                this.image.current.style.width = this.cutArea.current.getBoundingClientRect().height * ratio + ' px';
            } else {
                this.image.current.style.width = this.cutArea.current.getBoundingClientRect().width + 'px';
                this.image.current.style.height = this.cutArea.current.getBoundingClientRect().width / ratio + 'px';
            }

            this.image.current.style.left = (this.container.current.getBoundingClientRect().width - this.image.current.getBoundingClientRect().width / this.state.scale) / 2 + 'px';
            this.image.current.style.top = (this.container.current.getBoundingClientRect().height - this.image.current.getBoundingClientRect().height / this.state.scale) / 2 + 'px';    

        }    
    }

    componentDidUpdate = () => {
        if (this.state.correction) {
            const imageCoordinates = this.image.current.getBoundingClientRect();
            this.moveAt(
                Number(this.image.current.style.left.substring(0, this.image.current.style.left.length - 2)), 
                Number(this.image.current.style.top.substring(0, this.image.current.style.top.length - 2)),
                imageCoordinates.width,
                imageCoordinates.height
            ); 

            this.setState((prevState) => {
                return Object.assign(prevState, {
                    correction: false
                })
            }) 
        } 
    }

    render() {
      return (
        <div className='update-avatar_modify'>
            <div 
                className='modify-container'
                ref={this.container}
                onMouseMove={(e) => {
                    if (this.state.moving) {
                        const containerCooordinates = this.container.current.getBoundingClientRect();
                        const imageCoordinates = this.image.current.getBoundingClientRect();

                        this.moveAt(
                            e.pageX - containerCooordinates.left - this.shiftX + imageCoordinates.width / 2 - imageCoordinates.width / this.state.scale / 2, 
                            e.pageY - containerCooordinates.top - this.shiftY + imageCoordinates.height / 2 - imageCoordinates.height / this.state.scale / 2,
                            imageCoordinates.width,
                            imageCoordinates.height
                        );                
                    }
                }}
                onMouseLeave={(e) => {
                    this.setState({moving : false});
                }} 
            >
                <img 
                    src={this.props.link}
                    ref={this.image}
                    style={{transform : `scale(${this.state.scale})`}}
                    onDragStart={(e) => {return false}}
                    draggable={false}
                    onMouseDown={(e) => {
                        this.shiftX = e.clientX - this.image.current.getBoundingClientRect().left;
                        this.shiftY = e.clientY - this.image.current.getBoundingClientRect().top;

                        this.setState((prevState) => {
                            return Object.assign(prevState, {
                                moving: true
                            })
                        })    
                    }} 
                    onMouseUp={(e) => {
                        this.setState({moving : false});
                    }} 
                />
                <div 
                    className="cut-area"
                    ref={this.cutArea}
                >
                </div>
            </div>
            <div className='modify-range'>
                <input type='range' value={this.state.scale} min='1' max='2' step='0.001' onChange={(e) => {
                    this.setState((prevState) => {
                        return Object.assign(prevState, {
                            correction : true,
                            scale: e.target.value
                        })
                    })  
                }}/>
            </div>
            <div className='buttons-container'>
                <button className='btn error' onClick={() => {
                    this.props.fileUrlHandler(null);
                }}>Отменить</button>
                <button className='btn fill success' onClick={() => {
                    const cutAreaCooordinates = this.cutArea.current.getBoundingClientRect();
                    const imageCoordinates = this.image.current.getBoundingClientRect();

                    const imageUrl = modifyAndGenerateUrl(
                        this.image.current,
                        imageCoordinates.width,
                        imageCoordinates.height,
                        imageCoordinates.left - cutAreaCooordinates.left,
                        imageCoordinates.top - cutAreaCooordinates.top,
                        cutAreaCooordinates.width,
                        cutAreaCooordinates.height
                    );
                    this.props.fileUrlHandler(imageUrl);
                }}>Сохранить</button>
            </div>
        </div>
      );
    }
}

const UpdateAvatarPopup = ({closeModal, fileUrlHandler, directly}) => {
    const {userStore, notificationStore} = useContext(Context);
    
    const [newAvatar, setNewAvatar] = useState(null);
    const [initialAvatarLink, setInitialAvatarLink] = useState(null);
    const [newAvatarLink, setNewAvatarLink] = useState(null);
    const [isModifying, setIsModifying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (newAvatar && !newAvatarLink) {
            handleAvatar(newAvatar);
        }
    })

    const handleAvatar = function (avatar) {
        if (avatar.size > 1024 * 1024 * 2) { 
            setNewAvatar(null);
            notificationStore.show('Размер загружаемого изображения первышает лимит в 2 мб', 5000, 'error');
            return;
        }
    
        if (!(avatar.type == 'image/jpeg' || avatar.type == 'image/png')) { 
            setNewAvatar(null);
            notificationStore.show('Загружаемый файл не является изображением допустимого формата', 5000, 'error');
            return;
        }
    
        setIsLoading(true);
        var reader = new FileReader();
        reader.onload = function(e) { 
            setInitialAvatarLink(e.target.result);
            
            const initialImage = document.createElement('img');
            initialImage.onload = () => {
                const previewCoordinates = document.getElementById('newAvatarPreview').getBoundingClientRect();

                const ratio = initialImage.naturalWidth / initialImage.naturalHeight;
                if (ratio > 1) {
                    initialImage.height = previewCoordinates.height;
                    initialImage.width = previewCoordinates.width * ratio;
                } else {
                    initialImage.width = previewCoordinates.width;
                    initialImage.height = previewCoordinates.height / ratio;
                }

                const imageUrl = modifyAndGenerateUrl(
                    initialImage,
                    initialImage.width,
                    initialImage.height,
                    -(initialImage.width - previewCoordinates.width) / 2,
                    -(initialImage.height - previewCoordinates.height) / 2,
                    previewCoordinates.width,
                    previewCoordinates.height
                );
                setNewAvatarLink(imageUrl);
                setIsLoading(false);
            }
            initialImage.src = e.target.result;
        };
        reader.readAsDataURL(avatar);
    }

    const render = function () {
        if (newAvatar && newAvatarLink && isModifying) {
            return (
                <AvatarModify link={initialAvatarLink} fileUrlHandler={(fileUrl) => {
                    setIsModifying(false);
                    if (fileUrl) setNewAvatarLink(fileUrl);
                }}/>
            )
        }

        if (newAvatar) {
            return (
                <div className='update-avatar_preview'>
                    <div className='update-avatar_compare'>
                        <div className='new-avatar'>
                            <span>Новый</span>
                            <div className='image-preview' id='newAvatarPreview' style={{backgroundImage : `url('${newAvatarLink}')`}}></div>
                        </div>
                        <div className='old-avatar'>
                            <span>Старый</span>
                            <img src={userStore.user.avatar.url}/>
                        </div>
                    </div>
                    <div className='buttons-container'>
                        <button className='btn' onClick={() => {
                            setNewAvatar(null);
                            setNewAvatarLink('');
                        }}>Загрузить другой</button>
                        <button className='btn' onClick={() => {
                            setIsModifying(true);
                        }}>Изменить область</button>
                        <button className='btn fill success' onClick={() => {
                            if (directly) {
                                setIsLoading(true);
                                userStore.updateAvatar(newAvatarLink)
                                    .then((result) => {
                                        setNewAvatar(null);
                                        setNewAvatarLink(null);
                                        setInitialAvatarLink(null);
                                        setIsLoading(false);
                                        closeModal();
                                        
                                        notificationStore.show('Аватар успешно обновлен', 3000, 'success');
                                    })
                                    .catch((error) => {
                                        notificationStore.show('Произошла неизвестная ошибка', 3000, 'error');
                                    })
                            } else {
                                fileUrlHandler(newAvatarLink)
                                closeModal()
                            }
                        }}>Сохранить</button>
                    </div>
                </div>
            )
        }

        return (
            <DragAndDrop multiple={false} filesHandler={(files) => {
                setNewAvatar(files[0]);
            }}/>
        )
    }

    return (
        <div className='update-avatar_form'>
            {render()}
            {isLoading ? (
                <LoadingMask cHeight={70} cWidth={70} bg='#0f0f0f' opacity={0.8}/>
            ) : ''}
        </div>
    )
}

export default UpdateAvatarPopup;