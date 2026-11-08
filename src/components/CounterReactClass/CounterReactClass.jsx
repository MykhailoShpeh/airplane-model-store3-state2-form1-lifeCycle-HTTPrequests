import {React, Component} from 'react'

import {Controls} from '@/components/Controls/Controls.jsx'
import css from './CounterReactClass.module.css'

export class CounterReactClass extends Component {
    state ={
        count: 0,
    }

    handleIncrement = () => {
       this.setState(prevState => {
            return {
                count: prevState.count + 1,
            };
        });
    }

    handleDecrement = () => {
       this.setState(prevState => {
            return {
                count: prevState.count - 1,
            };
        });
    }

    render() { 
        return (
            <div className={css.counter}>
                <span className={css.counterValue}>{this.state.count}</span>

                <Controls
                    onHandleIncrement={this.handleIncrement}
                    onHandleDecrement={this.handleDecrement}
                />
            </div>
        )
    }

}