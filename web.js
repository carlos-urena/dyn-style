
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
        AddToneControls()
        AddTextFamilyNameBoxEventListener()
        AddHeadersFamilyNameBoxEventListener()
        SetHeadersFontFamily( 'Oswald')
        SetTextFontFamily( 'Neuton')
        SetHue(80)

    }

    var text_family_name_text_box = null
    var headers_family_name_text_box = null 

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

    /**
     * 
     * @param {*} newval 
     */
    function SetHue( newval ) 
    {
        let r = document.querySelector(':root')
        r.style.setProperty('--hue', newval )
        let ch = document.getElementById('current-hue')
        if ( ch != null )
            ch.innerHTML = `<b>${newval}<sup>o</sup></b>`
        console.log(`hue == ${newval}`)
    }
    function SetHueClosure( new_hue )
    {
      return function() { SetHue( new_hue ) }
    }
    /**
     * 
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
          button_elem.onclick = SetHueClosure( t ) 

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
        AddGoogleFontLink( family_name, weight )
        let r = document.querySelector(':root');
        r.style.setProperty('--tipo-fuente', family_name )
        let ctfn = document.getElementById('current-text-font-name')
        if ( ctfn != null )
            ctfn.innerHTML = `<b>${p_family_name}</b>`
        console.log(`tipo fuente texto == ${family_name}`)
    }

    


