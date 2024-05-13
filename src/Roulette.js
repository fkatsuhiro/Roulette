import React, { Component } from 'react';
import App from './App.css';
import bootstrap from './bootstrap.css';

class Roulette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deg: 0, // 角度
            velocity: 0, // 初速
            active: false, // 動作状態
            text1: '', //フォーム1
            text2: '', //フォーム2
            text3: '', //フォーム3
            text4: '', //フォーム4
        };
        this.circleRef = React.createRef(); // DOM要素への参照を作成
    }

    componentDidMount() {
        // DOM要素への参照を使ってイベントリスナーを追加
        this.resetButton.addEventListener('click', this.handleResetClick);
    }

    componentWillUnmount() {
        // コンポーネントがアンマウントされるときにイベントリスナーを削除
        this.resetButton.removeEventListener('click', this.handleResetClick);
    }

    handleStartClick = () => {
        if (!this.state.active) {
            this.setState({
                active: true,
                velocity: 60 + Math.random() * 20,
            }, () => {
                this.startButton.innerText = 'ストップ'; // ボタンの表示を「ストップ」に変更
                this.roulette();
            });
        } else {
            this.setState({ active: false }, () => {
                this.startButton.innerText = 'スタート'; // ボタンの表示を「スタート」に変更
            });
        }
    }

    handleResetClick = () => {
        this.setState({ active: false, deg: 0 }, this.setDeg);
    }

    roulette = () => {
        if (this.state.active && this.state.velocity > 0.2) {
            this.setState(prevState => ({
                deg: prevState.deg + prevState.velocity,
                velocity: prevState.velocity / 1.005,
            }), this.setDeg);
            setTimeout(this.roulette, 16);
        } else {
            this.setState({ active: false });
        }
    }

    setDeg = () => {
        this.circleRef.current.style.transform = `rotate(${this.state.deg}deg)`;
    }

    ClickKeep(){
        this.setState({
            text1: document.querySelector("input[name='text1']").value,
            text2: document.querySelector("input[name='text2']").value,
            text3: document.querySelector("input[name='text3']").value,
            text4: document.querySelector("input[name='text4']").value,
        });
    }

    resetForm(){
        this.setState({
            text1: document.querySelector("input[name='text1']").value = '',
            text2: document.querySelector("input[name='text2']").value = '',
            text3: document.querySelector("input[name='text3']").value = '',
            text4: document.querySelector("input[name='text4']").value = '',
        })
    }
    render() {
        return (
            <div>
                {/*選択項目の入力*/}
                <div className='font'>選択肢入力</div>
                <div className='row'>
                    <div className='under_circle'>
                        <div className='row under_form'>
                            <div className='col-1 next_text1'></div>
                            <div className='col-1'></div>
                            <input className="form-control col-10" type="text" name='text1' />
                        </div>
                        <div className='row under_form'>
                            <div className='col-1 next_text2'></div>
                            <div className='col-1'></div>
                            <input className="form-control col-10" type="text" name='text2' />
                        </div>
                        <div className='row under_form'>
                            <div className='col-1 next_text3'></div>
                            <div className='col-1'></div>
                            <input className="form-control col-10" type="text" name='text3' />
                        </div>
                        <div className='row under_form'>
                            <div className='col-1 next_text4'></div>
                            <div className='col-1'></div>
                            <input className="form-control col-10" type="text" name='text4' />
                        </div>
                        <div className='under_form ' style={{ textAlign: 'right' }}>
                            <button className='btn btn-secondary' style={{ marginRight: '10px' }} onClick={()=>{this.resetForm()}}>リセット</button>
                            <button className='btn btn-secondary' onClick={()=>{this.ClickKeep()}}>保存</button>
                        </div>
                    </div>
                </div>
                {/* ボタンの表示が修正されました */}
                <div className='buttons'>
                    <button className="btn btn-primary" type="button" id="start" ref={el => this.startButton = el} onClick={this.handleStartClick}>スタート</button>
                    <div className='little_space'></div>
                    <button className="btn btn-primary" type="button" id="reset" ref={el => this.resetButton = el}>リセット</button>
                </div>
                {/*ルーレット*/}
                <div id="pointer">▼</div>
                <div className="OutofCircle">
                    <div id="circle" ref={this.circleRef}>
                        <div className="quarter" id="quarter_1">
                            <div className="text1">{this.state.text1}</div>
                        </div>
                        <div className="quarter" id="quarter_2">
                            <div className="text2">{this.state.text2}</div>
                        </div>
                        <div className="quarter" id="quarter_3">
                            <div className="text3">{this.state.text3}</div>
                        </div>
                        <div className="quarter" id="quarter_4">
                            <div className="text4">{this.state.text4}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Roulette;
