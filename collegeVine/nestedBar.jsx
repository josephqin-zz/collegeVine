<App>
  <Foo fooProp>
    // fooProp is used to determine if foo is blah blah blah
    <NestedBar>
      <NestedBaz scenario >
            //scenario: scenario info [admin,consultant-dashboard,consultant-worksapce...]
      		{...<Iconbutton/>}
      </NestedBaz>
      <Content />
    </NestedBar>
  </Foo>
</App>

//Each icon button on top bars if selected the background would change and drop down menu would popup
<Iconbutton isSelected>
  { isSelected && <Dropdown/> }
</Iconbutton>

//the title bar next to the top icons bar
<Titlebar titleName isSelected>
	// titleName: the name show on title
	// isSelected: selected status
	{ isSelected && <Dropdown/>}
</Titlebar>


//drop down menus for icon button and title bar 
<Dropdown location optionList>
	//location: determines drop down menu screen location 
	//OptionList: shows all options
</Dropdown>

//auto complete search bar
<Searchbar location> </Searchbar>

//the rest of screen 
<Content hasTitle optionList>
    //optionList: data for next level visulizaiton  
	{ hasTitle && <Titlebar /> }
	{ <Searchbar/> || <PlaintText/> || <Others/>}
</Content>