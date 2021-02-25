function module(e,r,t){let o;t.link("react",{PureComponent(e){o=e}},0);class s extends o{constructor(){super(...arguments),this.state={errored:!1},this.componentDidCatch=()=>{},this.render=()=>this.state.errored?null:this.props.portal}}s.getDerivedStateFromError=()=>({errored:!0}),t.exportDefault(s)}

