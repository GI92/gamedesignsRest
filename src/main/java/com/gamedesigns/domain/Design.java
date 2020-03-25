package com.gamedesigns.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "design")
public class Design implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Lob
    private String description;
//    private List<DesignType> types;

    @Lob
    private byte[] icon;
//    private List<Preview> preview;

    @ManyToOne
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

//    public List<DesignType> getTypes() {
//        return types;
//    }
//
//    public void setTypes(List<DesignType> types) {
//        this.types = types;
//    }

    public byte[] getIcon() {
        return icon;
    }

    public void setIcon(byte[] icon) {
        this.icon = icon;
    }

//    public List<Preview> getPreview() {
//        return preview;
//    }
//
//    public void setPreview(List<Preview> preview) {
//        this.preview = preview;
//    }
}
