
    var controls_shown                = false 
    var text_family_name_text_box     = null
    var headers_family_name_text_box  = null 
    var current_text_family_name      = 'Crimson Pro'
    var current_headers_family_name   = 'Catamaran'
    var current_hue                   = 80
    var current_dark_theme            = false   // false --> light, true --> dark 
    var current_text_font_weight      = 100
    var current_bold_text_font_weight = 400
    
    // -------------------------------------------------------------------------------
    
    /**
     * Function for processing html text in literals
     * @param {string} html_text 
     * @returns        string with html text
     */
    function html( html_text )
    {
        return html_text 
    }
    // -------------------------------------------------------------------------------

    /**
     * Function for processing css code in literals
     * 
     * @param {string} css_text 
     * @returns        unstransformed string with css text
     */
    function css( css_text )
    {
        return css_text 
    }
    // -------------------------------------------------------------------------------
    
    /**
     * 
     */
    function SetWidthAndPadding() 
    {
        const 
            window_width    = window.innerWidth,
            max_text_width  = 900, // max body content width
            min_padding     = 30,   // min padding beetween content and div
            max_padding     = 60
        let 
            width          = '',
            padding_width  = ''
    
        console.log(`window_width == ${window_width} px`)

        if ( window_width <=  max_text_width + min_padding )
        {
            width          = `${window_width}px`
            padding_width  = `${min_padding}px`
        }
        else if ( window_width <= max_text_width + max_padding ) 
        {
            width          = `${window_width}px`
            padding_width  = `${window_width-max_text_width}px`
        }
        else 
        {
            width          = `${max_text_width+max_padding}px`
            padding_width  = `${max_padding}px`
        }
       

        let cc   = document.getElementById('div-cuerpo-central'),
            pie  = document.getElementById('div-pie'),
            cabe = document.getElementById('div-cabe')
        
        console.log(`width == ${width}, padding w == ${padding_width}`)

        cc.style.width          = width 
        cc.style.paddingLeft    = padding_width
        cc.style.paddingRight   = padding_width
        cc.style.paddingBottom  = padding_width 
        pie.style.width         = width  
        cabe.style.width        = width 
        cabe.style.paddingLeft  = padding_width
        cabe.style.paddingRight = padding_width

    }

    /**
     * 
     */
    function OnDOMContentLoaded()
    {
        let uri  = document.getElementById('uri')
        let actu = document.getElementById('actu')

        uri.innerHTML = document.documentURI 
        actu.innerHTML = document.lastModified
        
        SetWidthAndPadding()
        ShowHideStyleControls()  // actually shows controls, because this is the first time called
    }

   
    /**
     * 
     */
    function AddTextFamilyNameBoxEventListener()
    {
        text_family_name_text_box = document.getElementById('text_family_name_text_box');
        text_family_name_text_box.addEventListener('keypress', function(event){
            if (event.keyCode == 13 )
            {
                let tfn = text_family_name_text_box.value   
                console.log(`entered text family name == [${tfn}]`)
                SetTextFontFamily( tfn, null )
            }
        });
    }
    // -------------------------------------------------------------------------------

    /**
     * 
     */
    function AddHeadersFamilyNameBoxEventListener()
    {
        headers_family_name_text_box = document.getElementById('headers_family_name_text_box');
        headers_family_name_text_box.addEventListener('keypress', function(event){
            if (event.keyCode == 13 )
            {
                let hfn = headers_family_name_text_box.value   
                console.log(`entered headers family name == [${hfn}]`)
                SetHeadersFontFamily( hfn, null )
            }
        });
    }
    // -------------------------------------------------------------------------------
    
    /**
     * 
     * @param {*} newval 
     */
    function SetHue( newval ) 
    {
        current_hue = newval
        let r = document.querySelector(':root')
        r.style.setProperty('--hue', newval )
        let ch = document.getElementById('current-hue')
        if ( ch != null )
            ch.innerHTML = `<b>${newval}<sup>o</sup></b>`
        console.log(`hue == ${newval}`)
    }
    // -------------------------------------------------------------------------------
    
    /**
     * returns a function which sets the hue to a new value
     * @param {integer} new_hue 
     * @returns the function which set the hue to 'new_hue'
     */
    function GetSetHueFunction( new_hue )
    {
      return function() { SetHue( new_hue ) }
    }
    // -------------------------------------------------------------------------------

    /**
     * 
     */
    function SetCSSRoot( css_text )
    {
        let root_ste = document.getElementById('root_css_style_elem')
        if ( root_ste == null )
        {   console.log("error: cannot find 'root_css_style_elem'")
            return 
        }
        let text_node = document.createTextNode( css_text )
        if ( root_ste.children.length == 0 )
            root_ste.appendChild( text_node )
        else 
            root_ste.children[0] = text_node
        console.log(`css root set.`)
    }

    
    // -------------------------------------------------------------------------------
    
    /**
     * 
     */
     function GetLightThemeCSSText()
     {
        return css`
             :root
             {
                 --hue                        : ${current_hue} ;
                 --color-texto                : hsl( var(--hue), 10%, 10%);
                 --color-tema                 : hsl( var(--hue), 70%, 30%) ;   
                 --color-headers              : var( --color-tema ) ; 
                 --color-subrayado-enlaces    : var( --color-tema ) ; 
                 --color-fondo-cabecera       : hsl( var(--hue), 20%, 30% ) ; 
                 --color-titulo-cabecera      : hsl( var(--hue), 60%, 90% );
                 --color-fondo-cuerpo-central : hsl( var(--hue), 5%, 90% ) ;
                 --color-fondo-controles      : hsl( var(--hue), 5%, 80% );
                 --color-fondo-bordes         : hsl( var(--hue), 5%, 95% ) ;
                 --color-texto-enlaces        : hsl( var(--hue), 60%, 30% ) ;
                 --tamano-fuente              : 12pt ;
                 --tipo-fuente                : ${current_text_family_name} ; 
                 --tipo-fuente-headers        : ${current_headers_family_name} ;
                 --text-font-weight           : ${current_text_font_weight} ;
                 --bold-text-font-weight      : ${current_bold_text_font_weight} ;
                 --sombra-cabe-cuerpo         : 0px 0px 20px 5px rgb( 70%,70%,70%); 
                 --margen-superior-pie        : 8px ;
             }
         `
    }
    // -------------------------------------------------------------------------------
    
    /**
     * 
     */
    function SetCSSLightTheme()
    {
        const light_root_css = GetLightThemeCSSText()
        SetCSSRoot( light_root_css )
        current_dark_theme = false        
    }
    // -------------------------------------------------------------------------------
    /**
     * 
     */
     function GetDarkThemeCSSText()
     {
        return css`
             :root
             {
                 --hue                        : ${current_hue} ;
                 --color-texto                : hsl( var(--hue), 10%, 80%);
                 --color-tema                 : hsl( var(--hue), 87%, 67%) ; 
                 --color-headers              : var( --color-tema ) ; 
                 --color-subrayado-enlaces    : var( --color-tema ) ; 
                 --color-fondo-cabecera       : hsl( var(--hue), 5%, 5% ) ; 
                 --color-titulo-cabecera      : hsl( var(--hue), 60%, 70% );
                 --color-fondo-cuerpo-central : hsl( var(--hue), 5%, 15% ) ;
                 --color-fondo-controles      : hsl( var(--hue), 5%, 30% );
                 --color-fondo-bordes         : hsl( var(--hue), 25%, 30% ) ;
                 --color-texto-enlaces        : hsl( var(--hue), 60%, 80% ) ;
                 
                 --tamano-fuente              : 12pt ;
                 --tipo-fuente                : ${current_text_family_name} ; 
                 --tipo-fuente-headers        : ${current_headers_family_name}  ;
                 --font-weight-cabeceras      : 300 ;
                 --sombra-cabe-cuerpo         : none; 
                 --margen-superior-pie        : 0px ;
                 
             }
         `
     }
    // -------------------------------------------------------------------------------

    /**
     * 
     */
    function SetCSSDarkTheme()
    {
        const dark_root_css = GetDarkThemeCSSText()
        SetCSSRoot( dark_root_css )
        current_dark_theme = true
    }
    // -------------------------------------------------------------------------------

    /**
     * 
     */
    function SetCSSCurrentDarkLight()
    {
        if ( current_dark_theme )
            SetCSSDarkTheme()
        else
            SetCSSLightTheme()
    }
    // -------------------------------------------------------------------------------

    /**
     *  Adds a row of colour buttons inside 'tone_controls_row' span element (with no text)
     */
    function AddToneControls( )
    {
      
      let cc   =  document.getElementById('tone_controls_row') //document.getElementById('div-cuerpo-central')
      let step = 10 
      let prev = null 

      for( var t =0 ; t <= 360 ; t += step )
      {
          let button_elem     = document.createElement('input')
          button_elem.type    = 'button' 
          button_elem.value   = ` ` 
          button_elem.style.background = `hsl( ${t}, 50%, 50% )`
          button_elem.onclick = GetSetHueFunction( t ) 

          cc.appendChild( button_elem )
      }
    }

    /**
     * 
     * @param {*} string 
     * @returns 
     */
    function CleanString( string )
    {
        let s1 = string.replace(/\s\s+/g, ' ')
        return s1.trim()
    }
    function SubstituteSpaces( string )
    {
        return string.replace(/\s/g, '+');
    }
    /**
     * 
     * @param {*} p_family_name 
     * @param {*} weight 
     */
    function AddGoogleFontLink( p_family_name, weight ) 
    {
        let family_name_0 = CleanString( p_family_name )
        let family_name = SubstituteSpaces( family_name_0 )

        let weight_text = ''
        if ( weight != '' && weight != null )
            weight_text = `:wght@${weight}`
        let url_text = `https://fonts.googleapis.com/css2?family=${family_name}${weight_text}&display=swap`
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url_text ;
        document.getElementsByTagName('head')[0].appendChild(link);
        console.log(`added link -- name == ${family_name}`)
    }

    /**
     * 
     * @param {*} p_family_name 
     * @param {*} weight 
     */
    function SetHeadersFontFamily( p_family_name, weight )
    {
        let family_name = CleanString( p_family_name )
        current_headers_family_name = family_name
        AddGoogleFontLink( family_name, weight )
        let r = document.querySelector(':root');
        r.style.setProperty('--tipo-fuente-headers', family_name )
        let chfn = document.getElementById('current-headers-font-name')
        if ( chfn != null )
            chfn.innerHTML = `<b>${p_family_name}</b>`
        console.log(`tipo fuente headers == ${family_name}`)
    }

    /**
     * 
     * @param {*} p_family_name 
     * @param {*} weight 
     */
    function SetTextFontFamily( p_family_name, weight )
    {
        let family_name = CleanString( p_family_name )
        current_text_family_name = family_name
        AddGoogleFontLink( family_name, weight )
        let r = document.querySelector(':root');
        r.style.setProperty('--tipo-fuente', family_name )
        let ctfn = document.getElementById('current-text-font-name')
        if ( ctfn != null )
            ctfn.innerHTML = `<b>${p_family_name}</b>`
        console.log(`tipo fuente texto == ${family_name}`)
    }

 

    // ------------------------------------------------------------------------------------------

    /**
     * 
     * @returns 
     */
    function ShowHideStyleControls(  )
    {
        var controls_html = html`
            <h2>Style controls</h2>

            <button id='show-hide-controls' onclick='ShowHideStyleControls()'>Hide controls</button>

            <h3>Theme dark/light</h3>

            <input type='button' value='Dark theme' onclick="SetCSSDarkTheme()"/>
            <input type='button' value='Light theme' onclick="SetCSSLightTheme()"/>

            <h3>Theme color hue</h3>
        
            <table>
                <tr><td>Click:</td>  <td><span id='tone_controls_row'></span></td>
                <tr><td>Current:</td><td><span id='current-hue'><sup>o</sup></span></td>
            </table>

            <h3>Headers font</h3>
        
            <table>
                <tr>
                    <td>Type font name:</td>
                    <td><input id='headers_family_name_text_box' type='text'/></td>
                </tr>
                <tr>
                    <td>Selected font names:</td>
                    <td>
                        <input type='button' value='Roboto'           onclick="SetHeadersFontFamily('Roboto','')"/>
                        <input type='button' value='Roboto Condensed' onclick="SetHeadersFontFamily('Roboto Condensed','')"/>
                        <input type='button' value='Concert One'      onclick="SetHeadersFontFamily('Concert One','')"/>
                        <input type='button' value='Oswald'           onclick="SetHeadersFontFamily('Oswald','')"/>
                        <input type='button' value='Arvo'             onclick="SetHeadersFontFamily('Arvo','')"/>
                        <input type='button' value='Josefin Sans'     onclick="SetHeadersFontFamily('Josefin Sans','')"/>
                        <input type='button' value='Catamaran'        onclick="SetHeadersFontFamily('Catamaran','')"/>
                    </td>
                </tr>
                <tr>
                    <td>Current:</td> 
                    <td><span id='current-headers-font-name'></span></td>
                </tr>
            </table>

            <h3>Text font</h3>
            <table>
                <tr>
                    <td>Type font name:</td>   
                    <td><input id='text_family_name_text_box' type='text'/></td>
                </tr>
                <tr>
                    <td>Selected font names:</td>
                    <td>
                        <input type='button' value='Merriweather' onclick="SetTextFontFamily('Merriweather','')"/>
                        <input type='button' value='Recursive'    onclick="SetTextFontFamily('Recursive','')"/>
                        <input type='button' value='Dosis'        onclick="SetTextFontFamily('Dosis','')"/>
                        <input type='button' value='Signika'      onclick="SetTextFontFamily('Signika',null)"/>
                        <input type='button' value='Neuton'       onclick="SetTextFontFamily('Neuton',null)"/>
                        <input type='button' value='Cardo'        onclick="SetTextFontFamily('Cardo',null)"/>
                        <input type='button' value='Crimson Pro'  onclick="SetTextFontFamily('Crimson Pro',null)"/>
                    </td>
                </tr>
                <tr>
                    <td>Current:</td>
                    <td><span id='current-text-font-name'></span></td>
                </tr>
                <tr>
                    <td>Font weight:</td>
                    <td>
                        <select name="text_weight" id="text_weight">
                            <option value="-1">None</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                            <option value="300">300</option>
                            <option value="400">400</option>
                            <option value="500">500</option>
                        </select> 
                        (not working at all, WIP)
                    </td>
                </tr>
            </table>
        `
        // ----

        console.log('empieza ShowHide...')

        let controls = document.getElementById('style-controls')
        if ( controls == null )
        {
            console.log("cannot find 'style-controls'")
            return 
        }
                
        if ( controls_shown )
        {
            console.log('hidding controls')
            controls.innerHTML = "<button id='show-hide-controls' onclick='ShowHideStyleControls()'>Show controls</button>"
            controls.style = ''
            controls_shown = false 
            return
        }

        controls.innerHTML = controls_html

        controls.style = 'background-color : var(--color-fondo-controles); padding : 10px ;'
        //controls.style = `border-width : 1px  !important ; border-style : solid ; padding : 5px ; border-color : hsl(var(--hue),40%,40%);`

        SetCSSCurrentDarkLight()
        AddToneControls()
        AddTextFamilyNameBoxEventListener()
        AddHeadersFamilyNameBoxEventListener()

        SetHeadersFontFamily( current_headers_family_name )
        SetTextFontFamily( current_text_family_name )
        SetHue( current_hue )

        controls_shown = true 
    }


    


