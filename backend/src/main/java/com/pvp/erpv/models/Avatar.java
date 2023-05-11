package com.pvp.erpv.models;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "avatars")
public class Avatar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String rarity;

    private String pictureName;

    @ManyToMany(mappedBy = "avatars")
    private Set<User> users;

    public Long getId() {
        return id;
    }

    public String getRarity() {
        return rarity;
    }

    public String getName() {
        return name;
    }

    public String getPictureName() {
        return pictureName;
    }
}
